Random = (function () {
	"use strict";
	
	var exports = {}
	
	var toHex = function(number) {
		var hex = number.toString(16);
		if (hex.length === 1) {
			hex = "0" + hex;
		}
		return hex;
	}
	
	var between = function (min, max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	
	var color = function () {
		return "#" + toHex(between(0, 255)) + toHex(between(0, 255)) + toHex(between(0, 255));
	}
	
	var choice = function (array) {
		return array[between(0, array.length-1)];
	}
	
	exports.between = between;
	exports.color = color;
	exports.choice = choice;
	
	return exports;
})();