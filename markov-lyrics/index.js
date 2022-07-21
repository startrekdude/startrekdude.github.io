(function() {
	"use strict";
	
	var loadModel = function(ab) {
		var model = CBOR.decode(ab);
		window.modelRules = model[0];
		window.modelTokens = model[1];
		window.modelReady = true;
	}
	
	var fetchModel = function(path) {
		window.modelReady = false;
		var xhr = new XMLHttpRequest();
		xhr.addEventListener("load", function() {
			loadModel(xhr.response);
		});
		xhr.responseType = "arraybuffer";
		xhr.open("GET", path);
		xhr.send();
	}
	
	var modelLine = function() {
		var line = "";
		var token = "__BEGIN";
		for (;;) {
			var rules = window.modelRules[window.modelTokens.indexOf(token)];
			var rn = Math.random();
			for (var i = 0; i < rules.length; i++) {
				if (rn < rules[i][1]) break;
			}
			token = window.modelTokens[rules[i][0]];
			if (token == "__END") break;
			line += token + " ";
		}
		line = line.trim();
		return line.charAt(0).toUpperCase() + line.substring(1);
	}
	
	var modelParagraph = function(length) {
		var result = "";
		for (var i = 0; i < length; i++) {
			result += modelLine() + "\n";
		}
		return result;
	}
	
	var executeModel = function(verseLength, verseLengthVariance, numberOfVerses, chorusLength) {
		var chorus = modelParagraph(chorusLength);
		var song = "";
		
		for (var i = 0; i < numberOfVerses; i++) {
			var variance = Math.floor(Math.random()*verseLengthVariance) + 1;
			variance *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
			var verse = modelParagraph(verseLength+variance);
			song += verse + "\n" + chorus + "\n";
		}
		
		return song;
	}
	
	var readNumericInput = function(id) {
		return parseInt(document.getElementById(id).value);
	}
	
	var onClick = function() {
		var status = document.getElementById("status");
		
		if (!window.modelReady) {
			status.style.display = "inline";
			return;
		}
		status.style.display = "none";
		
		var result = executeModel(
			readNumericInput("verseLength"),
			readNumericInput("verseLengthVariance"),
			readNumericInput("numberOfVerses"),
			readNumericInput("chorusLength")
		);
		document.getElementById("result").value = result;
	}
	
	var readAloud = function() {
		var lines = document.getElementById("result").value.split("\n");
		var i = 0;
		
		var speakLine = function() {
			var line = new SpeechSynthesisUtterance(lines[i]);
			i++;
			if (i < lines.length) {
				line.addEventListener("end", speakLine);
			}
			window.speechSynthesis.speak(line);
		}
		speakLine();
	}
	
	var loadCustomModel = function() {
		var model = document.getElementById("customModel").files[0];
		var status = document.getElementById("status");
		var reader = new FileReader();
		window.modelReady = false;
		reader.addEventListener("load", function() {
			status.innerText = "Loaded " + model.name + ".";
			status.style.display = "inline";
			loadModel(reader.result);
		});
		reader.readAsArrayBuffer(model);
	}
	
	var init = function() {
		document.getElementById("submit").addEventListener("click", onClick);
		document.getElementById("readAloud").addEventListener("click", readAloud);
		document.getElementById("customModel").addEventListener("change", loadCustomModel);
		
		var model = document.getElementById("model");
		fetchModel(model.value);
		model.addEventListener("change", function() {
			fetchModel(model.value);
		});
	}
	
	document.addEventListener("DOMContentLoaded", init);
})();
