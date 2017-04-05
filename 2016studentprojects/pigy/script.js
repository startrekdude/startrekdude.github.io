(function (Random) {
	"use strict";
	
	var init = function () {
		var button = document.getElementById("yomyBRO");
		var links = document.getElementsByTagName("a");
		button.addEventListener("click", function () {
			Random.choice(links).click();
		});
		// Code that manipulates page goes here
		var header = document.getElementsByTagName("h1")[0];
		setInterval(function(){
			header.style.color = Random.color();
		}, 750);
	}
	
	document.addEventListener("DOMContentLoaded", init);
})(Random);