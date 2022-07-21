(function () {
	"use strict";
	
	var theme = Date.now() % 2 == 0 ? 0 : 1;
	
	var toggleTheme = function () {
		if (theme == 0) {
			document.body.style.backgroundImage = "url('/resources/congruent_pentagon.png')"
			theme = 1;
		} else {
			document.body.style.backgroundImage = "url('/resources/skulls.png')"
			theme = 0;
		}
	}
	
	var init = function () {
		toggleTheme();
		document.getElementById("theme-button").addEventListener("click", toggleTheme);
	}
	
	document.addEventListener("DOMContentLoaded", init);
})();