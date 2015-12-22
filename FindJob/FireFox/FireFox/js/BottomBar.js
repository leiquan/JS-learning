BottomBar.prototype = new Sprite();
BottomBar.prototype.constructor = BottomBar;

function BottomBar(){
	Sprite.call(this);
	var self = this;

	this.__construct__ = function(){
		this.rotation = 20;

		var explore = new Image();
		explore.src = "img/explore.png";

		this.explore = new Sprite();
		this.explore.draw = function(context){
			context.drawImage(explore, 0, 0);
		}

		this.addChild(this.explore);
		this.explore.x = 140;
		this.explore.y = 18;
	}

	this.addListeners = function(){
	}

	this.draw = function(context){
		context.fillStyle = "#2e2c2a";
		context.fillRect(0, 0, 318, 67);
	}

	this.mouseDraw = function(context){
		context.fillStyle = self.mouseString;
		context.fillRect(0, 0, 318, 67);
	}

	this.show = function(){
		if(this.showTween) this.showTween.stop();
		this.showTween = new Tween(this.explore, 400, {alpha: 1, ease: Ease.easeOut.sine});
	}

	this.hide = function(){
		if(this.showTween) this.showTween.stop();
		this.showTween = new Tween(this.explore, 400, {alpha: 0, ease: Ease.easeOut.sine});
	}

	this.toString = function(){
		return "[Sprite BottomBar]";
	}

	this.__construct__();
}
