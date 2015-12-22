CountText.prototype = new Sprite();
CountText.prototype.constructor = CountText;

function CountText(text, align){
	Sprite.call(this);
	this.text = text;
	this.align = align;
	this.textAlpha = 0;
	var self = this;

	this.__construct__ = function(){
	}

	this.addListeners = function(){
	}

	this.draw = function(context){
		context.font = "bold 30px Helvetica, Arial, sans-serif";
		var width = context.measureText(this.text).width;
		var x = 0;

		if(this.align == "left"){
			x = 0;
		} else if(this.align == "right"){
			x = -width;
		} else if(this.align == "center"){
			x = -width/2;
		}

		context.fillStyle = "rgb(46,44,42)";
		context.fillRect(x - 2, -25, width + 4, 30);

		context.fillStyle = "rgba(255,255,255," + (Math.round(this.textAlpha * 100) / 100) + ")";
		context.fillText(this.text, x, 0);
	}

	this.mouseDraw = function(context){
	}

	this.show = function(){
	}

	this.hide = function(){
	}

	this.toString = function(){
		return "[sprite CountText]";
	}

	this.__construct__();
}
