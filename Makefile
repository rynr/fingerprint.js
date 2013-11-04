SRC=src/fingerprint.js
LIBS=$(wildcard lib/*.js)

all: js/fingerprint.js
minimized: js/fingerprint-min.js

js/fingerprint.js: $(SRC) $(LIBS)
	cat $+ > $@

js/fingerprint-min.js: js/fingerprint.js
	curl -s -d compilation_level=SIMPLE_OPTIMIZATIONS -d output_format=text -d output_info=compiled_code --data-urlencode "js_code@$<" http://closure-compiler.appspot.com/compile > $@
