(function (Random) {
	"use strict";
	
	var init = function () {		// Code that manipulates page goes here
	var button = document.getElementById("top10hockie");
	var audio=document.getElementById("cheer");
	button.addEventListener("click", function () {
		alert("dont press the button");
		audio.play();
	});
		var header = document.getElementsByTagName("h1")[0];
		setInterval(function(){
			header.style.color = Random.color();
		}, 750);
	}
	
	document.addEventListener("DOMContentLoaded", init);
})(Random);
