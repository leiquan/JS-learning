Icons.prototype = new Sprite();
Icons.prototype.constructor = Icons;

function Icons(shot){
	Sprite.call(this);
	var self = this;

	this.shot = shot;
	this.viewTotal = shot.views_count;
	this.likeTotal = shot.likes_count;
	this.feedbackTotal = shot.comments_count;

	this.count = {
		likes: 0,
		feedback: 0,
		views: 0
	}

	this.__construct__ = function(){

		this.alpha = 0;
		this.rotation = -180;
		this.scaleX = 1/1.5;
		this.scaleY = 1/1.5;

		this.feedback = new Image();
		this.feedback.src = "img/feedback.png";

		this.views = new Image();
		this.views.src = "img/views.png";

		this.likes = new Image();
		this.likes.src = "img/likes.png";

		this.refresh = new Refresh();
		this.refresh.y = 108;

		this.likeCount = new CountText("0", "center");
		this.likeCount.y = -96;
		this.likeCount.x = -4;

		this.viewCount = new CountText("0", "left");
		this.viewCount.x = -124;
		this.viewCount.y = -4;

		this.feedbackCount = new CountText("0", "right");
		this.feedbackCount.x = 116;
		this.feedbackCount.y = -4;

		this.dribbbleLink = new DribbbleLink(this.shot, "榜单详情");
		this.dribbbleLink.x = -136;
		this.dribbbleLink.y = 46;

		this.addChild(this.refresh);
		this.addChild(this.likeCount);
		this.addChild(this.viewCount);
		this.addChild(this.feedbackCount);
		this.addChild(this.dribbbleLink);
	}

	this.addListeners = function(){
		this.refresh.addEventListener(MouseEvent.CLICK, this.toggle);
	}

	this.draw = function(context){

		// Draw curved line
		context.strokeStyle = "#595654";
		context.beginPath();
		context.arc(0, 0, 110, 0, Math.PI, true);
		context.stroke();

		// Draw image
		context.drawImage(this.likes, -33, -93);
		context.drawImage(this.views, -123, 2);
		context.drawImage(this.feedback, 33, 0);
	}

	this.mouseDraw = function(context){
	}

	this.countUp = function(){
		if(self.countTween) self.countTween.stop();

		self.count = {
			likes: 0,
			feedback: 0,
			views: 0
		}

		self.likeCount.text = "0";
		self.viewCount.text = "0";
		self.feedbackCount.text = "0";

		self.countTween = new Tween(self.count, 800, {delay: 400, likes: self.likeTotal, feedback: self.feedbackTotal, views: self.viewTotal, ease: Ease.easeOut.sine, onUpdate: function(){
			self.likeCount.text = Math.round(self.count.likes) + "";
			self.feedbackCount.text = Math.round(self.count.feedback) + "";
			self.viewCount.text = Math.round(self.count.views) + "";
		}});
	}

	this.show = function(){
		if(self.showTween) self.showTween.stop();
		self.dribbbleLink.show();

		self.showTween = new Tween(self, 800, {
			rotation: -90, alpha: 1, ease: Ease.easeOut.quint, delay: 600,
			onUpdate: function(){
				self.likeCount.textAlpha = self.alpha;
				self.viewCount.textAlpha = self.alpha;
				self.feedbackCount.textAlpha = self.alpha;
			},
			onComplete: function(){
				self.refresh.show();
			}
		});

		self.countUp();
	}

	this.hide = function(){
		if(self.showTween) self.showTween.stop();

		self.refresh.hide();
		self.dribbbleLink.hide();

		self.showTween = new Tween(self, 800, {
			alpha: 0, rotation: -180, ease: Ease.easeOut.quint,
			onUpdate: function(){
				self.likeCount.textAlpha = self.alpha;
				self.viewCount.textAlpha = self.alpha;
				self.feedbackCount.textAlpha = self.alpha;
			},
			onComplete: function(){
				self.alpha = 0;
			}
		});
	}

	this.toString = function(){
		return "[Sprite Icons]";
	}

	this.__construct__();
}
