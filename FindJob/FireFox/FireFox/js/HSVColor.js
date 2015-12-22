this.HSVColor = function(h, s, v){
	this.h = h;
	this.s = s;
	this.v = v;

	/*
	 * Convert an HSV color to a HEX color
	 */
	this.getHEX = function(){
		return this.getRGB().getHEX();
	}

	/*
	 * http://www.cs.rit.edu/~ncs/color/t_convert.html
	 * http://en.wikipedia.org/wiki/HSV_color_space
	 */
	this.getRGB = function(){
		var h = this.h;
		var s = this.s;
		var v = this.v;

		var r, g, b;
		var f, p, q, t;
		var i;

		s /= 100;
		v /= 100;

		if(s == 0){
			r = g = b = v;
			return new RGBColor(
				Math.round(r * 255),
				Math.round(g * 255),
				Math.round(b * 255)
			);
		}

		h /= 60; // sector 0 to 5
		i = Math.floor(h);
		f = h - i; // factorial part of h
		p = v * (1 - s);
		q = v * (1 - s * f);
		t = v * (1 - s * (1 - f));

		switch(i){
			case 0:
				r = v;
				g = t;
				b = p;
				break;

			case 1:
				r = q;
				g = v;
				b = p;
				break;

			case 2:
				r = p;
				g = v;
				b = t;
				break;

			case 3:
				r = p;
				g = q;
				b = v;
				break;

			case 4:
				r = t;
				g = p;
				b = v;
				break;

			default:
				r = v;
				g = p;
				b = q;
				break;
		}

		return new RGBColor(
			Math.round(r * 255),
			Math.round(g * 255),
			Math.round(b * 255)
		);
	}

	this.toString = function(){
		return "[object HSVColor]";
	}
}
