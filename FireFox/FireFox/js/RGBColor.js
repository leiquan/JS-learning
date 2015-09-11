var RGBColor = function(r, g, b){
	this.r = r;
	this.g = g;
	this.b = b;

	/*
	 * Convert an RGB color to a HEX color
	 */
	this.getHEX = function(){
		return new HEXColor(this.b | (this.g << 8) | (this.r << 16));
	}

	/*
	 * http://www.cs.rit.edu/~ncs/color/t_convert.html
	 * http://en.wikipedia.org/wiki/HSV_color_space
	 */
	this.getHSV = function(){
		var r = this.r;
		var g = this.g;
		var b = this.b;

		var min = Math.min(r, g, b);
		var max = Math.max(r, g, b);
		var delta =  max - min;

		var h = max;
		var s = max;
		var v = max;

		v = max / 255 * 100;

		if(max != 0) s = delta / max * 100;
		else return new HSVColor(0, 0, 0);

		if(r == max) h = (g - b) / delta;
		else if(g == max) h = 2 + (b - r) / delta;
		else h = 4 + (r - g) / delta;

		h = h * 60;
		if(h < 0) h += 360;
		return new HSVColor(h, s, v);
	}

	this.toString = function(){
		return "[object RGBColor]";
	}

	this.toStringCSS = function(){
		return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
	}
}
