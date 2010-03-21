// vim:ts=8:sw=8:tw=78:noexpandtab

// Fingerprint definition using JavaScript Module Pattern
// http://www.klauskomenda.com/code/javascript-programming-patterns/#module
var fingerprint = function () {
	var config = {
		parts: ['agent', 'plugins'],
		separator: '|',
		subseparator: ';'
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

	// Retrieve Plugin-Parts
	function fp_plugins() {
		// navigator.plugins returns a PluginArray that does not
		// support the map function, so using for here.
		// XXX Does someone know, how to better use map here?
		var plugins = navigator.plugins;
		var result = new Array(plugins.length);
		for(i=0; i<plugins.length; i++) {
			result[i] = extract_attributes_from_object(
				new Array('name', 'description', 'filename'),
				plugins[i]
			);
			// Also adding MimeType-Elements;
			for(j = 0; j< plugins[i].length; j++) {
				result[i] += extract_attributes_from_object(
					new Array('suffixes', 'description', 'type'),
					plugins[i][j]
				);
			}
		}
		return result.join(config.separator)
	}

	function extract_attributes_from_object(attributes, obj) {
		return attributes.map( function(att) {
				return eval('obj.'+ att + '.toString()')
		}).join(config.subseparator)
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


