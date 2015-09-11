var Point2D = function(x, y){
	this.x = x;
	this.y = y;

	this.rotate = function(angle){
		var x = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
		var y = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));

		this.x = x;
		this.y = y;
	}

	this.rotateAround = function(angle, around){
		around = around || {x: 0, y: 0};

		var cos = Math.cos;
		var sin = Math.sin;

		this.x = cos(angle) * (this.x-around.x) - sin(angle) * (this.y-around.y) + around.x
		this.y = sin(angle) * (this.x-around.x) + cos(angle) * (this.y-around.y) + around.y
	}

	this.translate = function(x, y){
		this.x += x;
		this.y += y;
	}

	this.scaleX = function(factor){
		this.x *= factor;
	}

	this.scaleY = function(factor){
		this.y *= factor;
	}

	this.scale = function(factor){
		this.x *= factor;
		this.y *= factor;
	}
}
