document.getElementById("pwdSubmit").addEventListener("click", function() {
	if (document.getElementById("password").value == "1") {
		document.getElementById("hidden").style.display = "block";
		window.scrollBy(0, 200);
	}
});