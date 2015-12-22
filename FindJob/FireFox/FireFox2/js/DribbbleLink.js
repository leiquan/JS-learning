DribbbleLink.prototype = new Sprite();
DribbbleLink.prototype.constructor = DribbbleLink;

function DribbbleLink(shot, linkText){
	Sprite.call(this);
	var self = this;

	this.shot = shot;
	this.buttonMode = true;
	this.linkText = linkText;

	this.__construct__ = function(){
		this.mouseEnabled = true;

		// Arrow image
		this.arrow = new Image();
		this.arrow.src = "img/arrows.png";

		// Arrow + text
		this.text = new Sprite();
		this.text.alpha = 0;
		this.text.draw = function(context){

			// Text style
			context.font = "bold 12px Helvetica, Arial, sans-serif";
			context.fillStyle = "rgba(255,247,238," + (Math.round(this.alpha * 100) / 100) + ")";

			// Draw text
			var width = context.measureText(self.linkText).width;
			context.fillText(self.linkText, 136 - (width / 2) - 6, 18);
			context.drawImage(self.arrow, 136 + (width / 2) - 4, 8);
		}

		// Add text
		this.addChild(this.text);
	}

	this.addListeners = function(){
		this.addEventListener(MouseEvent.ROLL_OVER, this.rollOver);
		this.addEventListener(MouseEvent.ROLL_OUT, this.rollOut);
		this.addEventListener(MouseEvent.CLICK, this.click);
	}

	this.removeListeners = function(){
		this.removeEventListener(MouseEvent.ROLL_OVER, this.rollOver);
		this.removeEventListener(MouseEvent.ROLL_OUT, this.rollOut);
		this.removeEventListener(MouseEvent.CLICK, this.click);
	}

	this.draw = function(context){
		context.fillStyle = "#060505";
		context.fillRect(0, 0, 272, 28);
	}

	this.mouseDraw = function(context){
		context.fillStyle = self.mouseString;
		context.fillRect(0, 0, 272, 28);
	}

	this.show = function(){
		if(self.showTween) self.showTween.stop();
		self.showTween = new Tween(self.text, 400, {alpha: .7, delay: 300, ease: Ease.easeOut.sine, onComplete: function(){
			self.addListeners();
		}});
	}

	this.hide = function(){
		self.removeListeners();
		if(self.showTween) self.showTween.stop();
		self.showTween = new Tween(self.text, 400, {alpha: 0, ease: Ease.easeOut.sine});
	}

	this.rollOver = function(){
		if(self.showTween) self.showTween.stop();
		self.showTween = new Tween(self.text, 400, {alpha: 1, ease: Ease.easeOut.sine});
	}

	this.rollOut = function(){
		if(self.showTween) self.showTween.stop();
		self.showTween = new Tween(self.text, 400, {alpha: .7, ease: Ease.easeOut.sine});
	}

	this.click = function(){
		window.open(self.shot.url);
	}

	this.toString = function(){
		return "[Sprite DribbleLink]";
	}

	this.__construct__();
}
