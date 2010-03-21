// vim:ts=8:sw=8:tw=78:noexpandtab

// Fingerprint definition using JavaScript Module Pattern
// http://www.klauskomenda.com/code/javascript-programming-patterns/#module
var fingerprint = function () {
	var config = {
		parts: ['agent'],
		separator: '|'
	}

	function join_fingerprint() {
		return config.parts.map( function(part) {
			return eval('fp_' + part + '();');
		}).join(config.separator)
	}

	function debug(info) {
		alert(info);
	}

	// Retrieve UserAgent-Part
	function fp_agent() {
		return navigator.userAgent;
	}

	return {
		str: function() {
			return join_fingerprint();
		},
		md5: function() {
			return MD5(join_fingerprint());
		}
	}
}();


