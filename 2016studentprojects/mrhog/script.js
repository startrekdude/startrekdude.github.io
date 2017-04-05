(function (Random) {
	"use strict";
	
	var init = function () {
		var button = document.getElementById("sfxbutton");
		button.addEventListener("click", function () {
		alert("GroundHogs are awesome");
		});
		var header = document.getElementsByTagName("h1")[0];
		setInterval(function(){
			header.style.color = Random.color();
		}, 750);
	}
	
	document.addEventListener("DOMContentLoaded", init);
})(Random);