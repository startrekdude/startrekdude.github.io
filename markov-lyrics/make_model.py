import unicodedata

from collections import defaultdict
from glob import glob
from sys import argv as args, exit

import cbor

def split_iterator(s, tk):
	while (i := s.find(tk)) != -1:
		yield s[:i]
		s = s[i+1:]
	yield s

def canonicalize(s):
	return unicodedata.normalize("NFKC", s).lower()

def make_model(data):
	rules = defaultdict(lambda: defaultdict(lambda: 0))
	
	for line in split_iterator(data, "\n"):
		line = line.strip()
		tk = "__BEGIN"
		for new_tk in split_iterator(line, " "):
			new_tk = canonicalize(new_tk)
			if new_tk == "": continue
			rules[tk][new_tk] += 1
			tk = new_tk
		rules[tk]["__END"] += 1
	
	rules["__END"]["__BEGIN"] = 1
	rules["__BEGIN"]["__END"] = 0
	
	for key in rules.keys():
		rules[key] = dict(rules[key])
	return dict(rules)

def reify_model(model):
	tokens = list(sorted(model.keys()))
	tokens.remove("__BEGIN")
	tokens.remove("__END")
	tokens = ["__END", "__BEGIN"] + tokens
	rules = [list() for _ in range(len(tokens))]
	
	for idx, tk in enumerate(tokens):
		rule = model[tk]
		denom = sum(rule.values())
		acc = 0.0
		for new_tk, num in rule.items():
			acc += num/denom
			rules[idx].append([tokens.index(new_tk), acc])
		rules[idx][-1][1] = 1.0
	
	return (tokens, rules)

def serialize_model(model):
	return cbor.dumps([model[1], model[0]])

def main():
	if len(args) < 3:
		print("Usage: make_model <glob_spec> <model>")
		exit(-1)
	
	glob_spec = args[1]
	model_path = args[2]
	
	files = glob(glob_spec, recursive=True)
	if len(files) == 0:
		print("No files.")
		exit(-1)
	
	data = ""
	for file in files:
		with open(file, encoding='utf8', errors='ignore') as f:
			data += f.read()
	
	model = make_model(data)
	reified_model = reify_model(model)
	model_data = serialize_model(reified_model)
	
	with open(model_path, "wb") as f:
		f.write(model_data)

if __name__ == "__main__":
	main()