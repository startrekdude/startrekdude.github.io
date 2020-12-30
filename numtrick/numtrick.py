from sys import argv as args, exit

def to_base(number, base):
	power = 0
	while base**power < number:
		power += 1
	
	while number:
		while base**power > number:
			power -= 1
		for coeff in range(1, base):
			if base**power * coeff > number:
				coeff -= 1
				break
		yield coeff, power
		number -= base**power * coeff
		power -= 1

def to_part(coeff, power, base):
	one = "({0} / {0})".format(base)
	
	if power == 0:
		baseStr = "{0} / {0}".format(base)
	else:
		baseStr = " * ".join(str(base) for _ in range(power))
	
	if coeff == 1:
		return baseStr
	
	if coeff < base // 2:
		coeff = "({})".format(" + ".join(one for _ in range(coeff)))
	else:
		coeff = base - coeff
		coeff = " + ".join(one for _ in range(coeff))
		coeff = "({} - ({}))".format(base, coeff)
	
	return "{} * {}".format(coeff, baseStr)

def main():
	if len(args) < 3:
		print("Usage: numtrick <target> <digit>")
		exit(-1)
	
	target = int(args[1])
	digit = int(args[2])
	
	expr = " + ".join(to_part(coeff, power, digit) for coeff, power in to_base(target, digit))
	print(expr)

if __name__ == "__main__":
	main()