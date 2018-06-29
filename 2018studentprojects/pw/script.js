document.getElementById("pwdSubmit").addEventListener("click", function() {
	if (document.getElementById("password").value == "Don't open this website") {
		document.getElementById("hidden").style.display = "block";
		window.scrollBy(0, 200);
	}
});