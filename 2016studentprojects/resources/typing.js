(function () {
	"use strict";
	
	var typing = [
		{key:".",text:"This character is called a dot, or a period."},
		{key:"=",text:"This character is called an equal sign."},
		{key:"/",text:"This character is called a slash."},
		{key:"-",text:"This character is called a dash."},
		{key:":",text:"This character is called a colon."},
		{key:";",text:"This character is called a semicolon."},
		{key:"#",text:"This character is called a hashtag."},
		{key:">",text:"This character is called an angle bracket."},
		{key:"}",text:"This character is called a curly brace."},
		{key:"<",text:"This character is also called an angle bracket."},
		{key:"{",text:"This character is also called a curly brace."},
	];
	
	var shuffle = function(a) {
		var j, x, i;
		for (i = a.length; i; i -= 1) {
			j = Math.floor(Math.random() * i);
			x = a[i - 1];
			a[i - 1] = a[j];
			a[j] = x;
		}
	}
	
	shuffle(typing);
	
	var switching = false;
	var start = Date.now();
	var penalty = 0;
	
	var load = function () {
		var margin = (25 + document.getElementById("right").clientHeight - 
			document.getElementById("character-name").clientHeight - 
			document.getElementById("character").clientHeight) / 2;
		document.getElementById("character-name").parentElement.style.marginTop = margin.toString() + "px";
		margin = (document.getElementById("left").clientHeight - 
			document.getElementById("status").clientHeight - 
			document.getElementById("character-typed").clientHeight - 40) / 2;
		document.getElementById("status").parentElement.style.marginTop = margin.toString() + "px";
	}
	
	var switchKey = function () {
		var character = document.getElementById("character");
		var characterName = document.getElementById("character-name");
		var typed = document.getElementById("character-typed");
		var status = document.getElementById("status");
		switching = false;
		character.innerText = typing[0].key;
		characterName.innerText = typing[0].text;
		typed.innerText = "?";
		typed.style.color = "";
		if (typing[0].key === ".")
			status.innerText = "Try to type a period"
		else
			status.innerText = "Try to type " + typing[0].key;
	}
	
	var onKey = function(e) {
		var typed = document.getElementById("character-typed");
		var status = document.getElementById("status");
		var characterName = document.getElementById("character-name");
		var character = document.getElementById("character");
		if (switching) return;
		typed.innerText = e.key;
		if (e.key == typing[0].key) {
			typed.style.color = "green";
			typing.splice(0, 1);
			if (typing.length !== 0) {
				status.innerText = "Good Job! You typed " + e.key + "!\nPlease wait for next challenge...";
				switching = true;
				setTimeout(switchKey, 1500);
			} else {
				switching = true;
				var seconds = Math.round((Date.now() - start)/1000) + penalty;
				alert("You're DONE!!!");
				typed.innerHTML = "&#9786;";
				character.innerHTML = "&#9786;";
				character.className = "spin";
				characterName.innerText = "Good Job! You did it!!";
				status.innerText = "WOW! You finished the entire typing challenge in only "  + 
					seconds.toString() + " seconds!!!";
			}
		} else {
			typed.style.color = "red";
			status.innerText = "So close! Try again...\nFive seconds have been added to your time!";
			penalty += 5;
		}
	}
	
	var preventBackspace = function (e) {
		if (e.keyCode === 8)
			e.preventDefault();
	}
	
	var cheaters = function (e) {
		if (!confirm("Are you sure you would like to access the cheat sheet?\nIf you do, you will lose your progress!!"))
			e.preventDefault();
	}
	
	var init = function () {
		switchKey();
		document.body.addEventListener("keypress", onKey);
		document.body.addEventListener("keydown", preventBackspace);
		document.getElementById("cheaters-only").addEventListener("click", cheaters);
	}

	document.addEventListener("DOMContentLoaded", init);
	window.addEventListener("load", load);
})();