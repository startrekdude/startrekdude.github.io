(function (Random) {
	"use strict";
	
	var init = function () {
		var button = document.getElementById("jumpscareButton");
		var image=document.getElementById("thing");
		var audio=document.getElementById("DOOM");
		button.addEventListener("click", function () {
			image.style.display="block";
			audio.play();
		});
		var header = document.getElementsByTagName("h1")[0];
		setInterval(function(){
			header.style.color = Random.color();
		}, 750);
	}
	
	document.addEventListener("DOMContentLoaded", init);
})(Random);