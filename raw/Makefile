FORMATS = 64 192 512
FILES = $(patsubst %,../public/logo%.png,$(FORMATS))

all: $(FILES)

../public/logo%.png: logo.png
	convert $^ -resize $*x$* $@