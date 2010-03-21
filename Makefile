SRC=src/fingerprint.js
LIBS=$(wildcard lib/*.js)

all: js/fingerprint.js

js/fingerprint.js: $(SRC) $(LIBS)
	cat $+ > $@
