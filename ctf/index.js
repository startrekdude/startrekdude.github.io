(function() {
	var _HEX_DIGITS = "0123456789abcdef";
	
	var fromHex = function(hex) {
		var buf = new Uint8Array(hex.length/2);
		
		for (var i = 0; i < hex.length; i += 2) {
			buf[i/2] = (_HEX_DIGITS.indexOf(hex[i]) << 4) + _HEX_DIGITS.indexOf(hex[i+1]);
		}
		
		return buf;
	}
	
	var unlock = function(ct, salt, key, cb) {
		argon2.hash({
			"pass": key,
			"salt": salt,
			
			"time": 1,
			"mem": 65536,
			"hashLen": 32
		}).then(function(hash) {
			var key = hash.hash;
			var nonce = new Uint8Array(12);
			var message = fromHex(ct);
			
			var chacha = new JSChaCha20(key, nonce);
			var pt = chacha.decrypt(message);
			var text = new TextDecoder().decode(pt);
			
			if (text.startsWith("VERIFIED::")) {
				cb(true, text.substring(10));
			} else {
				cb(false, text);
			}
		});
	}
	
	var SecretBox_makeUnlock = function(key, dest, ct, salt) {
		return function() {
			unlock(ct, salt, key.value, function(success, text) {
				if (!success) {
					alert("Incorrect key.");
				} else {
					dest.innerText = text;
				}
			});
		}
	}
	
	var SecretBox_init = function(el, ct, salt) {
		var button = el.querySelector("button");
		var dest = el.querySelector("p:last-child");
		var key = el.querySelector("input");
		
		var SecretBox_unlock = SecretBox_makeUnlock(key, dest, ct, salt);
		button.addEventListener("click", SecretBox_unlock);
	}
	
	var init = function() {
		var secretbox1 = document.getElementById("secretbox1");
		var secretbox2 = document.getElementById("secretbox2");
		
		SecretBox_init(secretbox1,
			"83b8694c34d0d1adbce7ca4cbe013e5e82a9e0ee8f757c71a95b3c927bbe1ee03cfdad6176835e6259293db4c5ab9df5",
			"866200709bccabfc918635bb406096d9");
		SecretBox_init(secretbox2,
			"cef433778cd154a871fa81fecba971910d390a4d5182009e84111e2d6e467217a920f168e0d970cac1c7",
			"13e4529b3ef74f1b58f199f8fc1c1817");
	}
	
	document.addEventListener("DOMContentLoaded", init);
})();