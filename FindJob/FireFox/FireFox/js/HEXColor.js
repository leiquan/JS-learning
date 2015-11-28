var HEXColor = function(value){
	this.value = value;

	this.getRGB = function(){
		return new RGBColor(
			this.value >> 16 & 0xFF,
			this.value >> 8 & 0xFF,
			this.value & 0xFF
		);
	}

	this.getHSV = function(){
		return this.getRGB().getHSV();
	}

	this.toString = function(){
		return "[object HEXColor]";
	}

	this.toStringCSS = function(){
		var s = this.value.toString(16);
		if(s.length < 6) s = "0" + s;
		return "#" + s;
	}
}
