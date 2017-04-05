(function (Random) {
	"use strict";
	
	var init = function () {
		var button = document.getElementById("sfxButton");
		button.addEventListener("click", function () {
			alert("Star Trek Is Awesome!!!");
		});
		var header = document.getElementsByTagName("h1")[0];
		setInterval(function(){
			header.style.color = Random.color();
		}, 750);
	}
	
	var load = function () {
		var audio = Random.between(0, 1);
		if (audio === 1) {
			document.getElementById("8bit").play();
		} else {
			var audios = document.getElementsByClassName("mlg");
			audios[0].addEventListener("ended", function () {
				audios[0].currentTime = 0;
				audios[1].play();
			});
			audios[1].addEventListener("ended", function () {
				audios[1].currentTime = 0;
				audios[2].play();
			});
			audios[2].addEventListener("ended", function () {
				audios[2].currentTime = 0;
				audios[0].play();
			});
			audios[0].play();
		}
	}
	
	document.addEventListener("DOMContentLoaded", init);
	window.addEventListener("load", load);
})(Random);