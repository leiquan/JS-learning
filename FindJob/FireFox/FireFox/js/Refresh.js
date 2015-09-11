Refresh.prototype = new Sprite();
Refresh.prototype.constructor = Refresh;

function Refresh(){
	Sprite.call(this);
	var self = this;

	this.__construct__ = function(){
		this.alpha = .5;
		this.refresh = new Image();
		this.refresh.src = "img/refresh.png";
		//this.refresh.src = "";
		this.mouseEnabled = true;
		this.buttonMode = true;
		this.addListeners();
	}

	this.addListeners = function(){
		this.addEventListener(MouseEvent.ROLL_OVER, this.rollOver);
		this.addEventListener(MouseEvent.ROLL_OUT, this.rollOut);
	}

	this.draw = function(context){
		context.drawImage(this.refresh, -12, -13);
	}

	this.mouseDraw = function(context){
		context.fillStyle = self.mouseString;
		context.drawImage(this.refresh, -12, -13);
		context.fillRect(-12, -13, 25, 26);
	}

	this.show = function(){
		/*
		if(self.showTween) self.showTween.stop();
		self.showTween = new Tween(self, 800, {
			rotation: 0, alpha: 1, ease: Ease.easeOut.sine,
			onComplete: function(){
				// stuff
			}
		});
		*/
	}

	this.hide = function(){
		/*
		if(self.showTween) self.showTween.stop();
		self.showTween = new Tween(self, 800, {
			alpha: 0, rotation: -180, ease: Ease.easeOut.sine,
			onComplete: function(){
				// stuff
			}
		});
		*/
	}

	this.rollOver = function(){
		if(self.showTween) self.showTween.stop();
		self.showTween = new Tween(self, 200, {
			alpha: 1, ease: Ease.easeOut.sine,
			onComplete: function(){
				// stuff
			}
		});
	}

	this.rollOut = function(){
		if(self.showTween) self.showTween.stop();
		self.showTween = new Tween(self, 200, {
			alpha: .5, ease: Ease.easeOut.sine,
			onComplete: function(){
				// stuff
			}
		});
	}

	this.click = function(){
		//console.log("click");
	}

	this.toString = function(){
		return "[sprite Refresh]";
	}

	this.__construct__();
}
