TriangleMask.prototype = new Sprite();
TriangleMask.prototype.constructor = TriangleMask;
TriangleMask.START_RENDERING = "triangle_start_rendering";
TriangleMask.STOP_RENDERING = "triangle_stop_rendering";
TriangleMask.READY = "triangle_ready";

function TriangleMask(img, shot){
	Sprite.call(this);
	var self = this;

	this.img = img;
	this.shot = shot;

	this.__construct__ = function(){
		this.scaleX = .8;
		this.scaleY = .8;

		// Sprite properties
		this.width = 306;
		this.height = 268;
		this.mouseEnabled = true;
		this.buttonMode = true;

		// Properties to animate
		this.imageX = -254;
		this.imageY = -170;
		this.maskAngle = 0;
		this.maskScale = 1;
		this.blackAlpha = 1;
		this.cornerRadius = 10

		// Animation flags
		this.noTilt = false;
		this.isTriangle = true;
		this.drawImage = false;

		// Dribbble icons
		this.icons = new Icons(this.shot);
		this.icons.visible = false;

		// Bar that appears on roll over
		this.bottomBar = new BottomBar();
		this.bottomBar.visible = false;
		this.bottomBar.x = -159;
		this.bottomBar.y = 100;

		// Init
		this.addChild(this.icons);
		this.addChild(this.bottomBar);
		this.addListeners();
	}

	this.addListeners = function(){
		this.addEventListener(MouseEvent.ROLL_OVER, this.rollOver);
		this.addEventListener(MouseEvent.ROLL_OUT, this.rollOut);
		this.addEventListener(MouseEvent.CLICK, this.toggle);
		this.icons.refresh.addEventListener(MouseEvent.CLICK, this.toggle);
	}

	this.getDistance = function(pointA, pointB){
		var pow = Math.pow;
		return Math.sqrt(pow((pointB.x-pointA.x), 2) + pow((pointB.y-pointA.y), 2))
	}

	this.getPointOnLine = function(pointA, pointB, t){
		var x = (1-t)*pointA.x + t*pointB.x;
		var y = (1-t)*pointA.y + t*pointB.y;
		return new Point2D(x, y);
	}

	this.getPointOnCircle = function(o, r, a){
		x = o.x + r * Math.cos(a);
		y = o.y + r * Math.sin(a);
		return {x: x, y: y}
	}

	this.fadeIn = function(){
		this.drawImage = true;
		new Tween(self, 300, {scaleX: 1, scaleY: 1, blackAlpha: 0, ease: Ease.easeOut.expo, onComplete: function(){
			self.dispatchEvent({name: TriangleMask.READY, triangle: self});
			self.blackAlpha = 0;
		}});
	}

	this.draw = function(context){

		// Shortcuts
		var w = this.width;
		var h = this.height;
		var r = this.cornerRadius;

		//     Corners
		//        A
		//      /   \
		//    /       \
		//   C _______ B
		this.c2 = new Point2D(0, 0);
		this.c5 = new Point2D(w/2, h);
		this.c8 = new Point2D(-w/2, h);

		// Triangle points
		var pointA = this.c2;
		var pointB = this.c5;
		var pointC = this.c8;

		// Triangle center
		this.center = new Point2D(
			(pointA.x + pointB.x + pointC.x) / 3,
			(pointA.y + pointB.y + pointC.y) / 3
		);

		// Center the triangle
		pointA.y -= this.center.y;
		pointA.x -= this.center.x;
		pointB.y -= this.center.y;
		pointB.x -= this.center.x;
		pointC.y -= this.center.y;
		pointC.x -= this.center.x;

		// Distances
		var sizeAB = this.getDistance(pointA, pointB);
		var sizeBC = this.getDistance(pointB, pointC);
		var sizeCA = this.getDistance(pointC, pointA);

		// Arc points, top
		this.c1 = this.getPointOnLine(pointC, pointA, (sizeCA - r) / sizeCA);
		this.c3 = this.getPointOnLine(pointB, pointA, (sizeAB - r) / sizeAB);

		// Arc points, right
		this.c4 = this.getPointOnLine(pointA, pointB, (sizeAB - r) / sizeAB);
		this.c6 = this.getPointOnLine(pointC, pointB, (sizeBC - r) / sizeBC);

		// Arc points, left
		this.c7 = this.getPointOnLine(pointB, pointC, (sizeBC - r) / sizeBC);
		this.c9 = this.getPointOnLine(pointA, pointC, (sizeCA - r) / sizeCA);

		// Transform ye points
		this.rotateMask(this.maskAngle);

		// Draw
		self.drawTriangle(context);
		context.save();
		context.clip();

		// Draw image
		if(self.drawImage) context.drawImage(this.img, this.imageX, this.imageY);
		context.fillStyle = "rgba(46,44,42," + this.blackAlpha + ")";
		context.fillRect(-200, -180, 400, 300);
	}

	this.afterDraw = function(context){
		self.drawTriangle(context);
		context.restore();
		context.strokeStyle = '#F5F0EB';
		context.stroke();
	}

	this.drawTriangle = function(context){
		var r = this.cornerRadius;

		context.beginPath();
		context.moveTo(this.c1.x, this.c1.y);
		context.arcTo(this.c2.x, this.c2.y, this.c3.x, this.c3.y, r);
		context.lineTo(this.c4.x, this.c4.y);
		context.arcTo(this.c5.x, this.c5.y, this.c6.x, this.c6.y, r);
		context.lineTo(this.c7.x, this.c7.y);
		context.arcTo(this.c8.x, this.c8.y, this.c9.x, this.c9.y, r);
		context.lineTo(this.c1.x, this.c1.y);
		context.closePath();
	}

	this.mouseDraw = function(context){
		context.fillStyle = this.mouseString;
		this.drawTriangle(context);
		context.fill();
	}

	this.rotateMask = function(theta){
		var pi = Math.PI;
		var angle = theta * pi/180;

		this.c1.rotate(angle);
		this.c2.rotate(angle);
		this.c3.rotate(angle);
		this.c4.rotate(angle);
		this.c5.rotate(angle);
		this.c6.rotate(angle);
		this.c7.rotate(angle);
		this.c8.rotate(angle);
		this.c9.rotate(angle);
	}

	this.circleMorph = function(){

		// Kill tweens
		if(self.cornerTween) self.cornerTween.stop();
		if(self.spinTween) self.spinTween.stop();
		if(self.tiltTween) self.tiltTween.stop();

		// Show dribbble icons
		self.icons.show();
		self.icons.visible = true;

		// Animate
		self.isTriangle = false;
		self.cornerTween = new Tween(self, 800, {cornerRadius: 88, ease: Ease.easeInOut.expo});
		self.spinTween = new Tween(self, 800, {scaleX: 1.5, scaleY: 1.5, blackAlpha: 1, rotation: 90, ease: Ease.easeInOut.back, onComplete: function(){

			// Reset properties
			self.scaleX = 1.5;
			self.scaleY = 1.5;
			self.imageX = -254;
			self.imageY = -170;
			self.rotation = 90;
			self.maskAngle = 0;
			self.blackAlpha = 1;

			// Stop drawing image
			self.drawImage = false;
			self.toggling = false;
		}});

		// Handle events
		self.removeEventListener(MouseEvent.CLICK, self.toggle);
	}

	this.triangleMorph = function(){

		// Kill tweens
		if(self.tiltTween) self.tiltTween.stop();
		if(self.cornerTween) self.cornerTween.stop();
		if(self.spinTween) self.spinTween.stop();

		// Reset
		self.maskAngle = 0;
		self.imageX = -254;
		self.imageY = -170;

		// Animate corners
		self.cornerTween = new Tween(self, 800, {delay: 200, cornerRadius: 10, ease: Ease.easeInOut.expo});
		self.spinTween = new Tween(self, 800, {scaleX: 1, scaleY: 1, delay: 200, blackAlpha: 0, rotation: 0, ease: Ease.easeInOut.back, onComplete: function(){

			// Reset properties
			self.rotation = 0;
			self.blackAlpha = 0;
			self.scaleX = 1;
			self.scaleY = 1;

			// Update events
			self.dispatchEvent({name: TriangleMask.STOP_RENDERING, triangle: self});
			self.addEventListener(MouseEvent.CLICK, self.toggle);

			// Hide icons
			self.icons.visible = false;
			self.isTriangle = true;
			self.toggling = false;
		}});

		// Hide icons
		self.icons.hide();
		self.drawImage = true;
	}

	this.toggle = function(){
		if(self.toggling) return false;
		self.toggling = true;

		// Make sure we're rendering
		self.dispatchEvent({name: TriangleMask.START_RENDERING, triangle: self});

		// It's a triangle
		if(self.isTriangle) {
			self.circleMorph();
			self.buttonMode = false;
			GlobalEvents.dispatch(new GlobalEvent(GlobalEvent.EVAL_MOUSE));
			GlobalEvents.dispatch({name: "TriangleToggleIn", triangle: self});

		// It's a circle
		} else {
			self.triangleMorph();
			self.buttonMode = true;
			GlobalEvents.dispatch(new GlobalEvent(GlobalEvent.EVAL_MOUSE));
			GlobalEvents.dispatch({name: "TriangleToggleOut", triangle: self});
		}

		// Hide bottom bar
		if(self.barTween) self.barTween.stop();
		self.barTween = new Tween(self.bottomBar, 400, {rotation: 20, y: 100, ease: Ease.easeOut.quint});
		self.bottomBar.hide();
	}

	this.rollOver = function(){
		if(!self.isTriangle || self.toggling) return false;
		self.out = false;

		// Make sure we're rendering
		self.dispatchEvent({name: TriangleMask.START_RENDERING, triangle: self});

		// Tilt triangle
		if(self.tiltTween) self.tiltTween.stop();
		self.tiltTween = new Tween(self, 600, {
			maskAngle: 10,
			cornerRadius: 20,
			ease: Ease.easeOut.quint,
			onComplete: function(){
				// stuff
			}
		});

		// Animate
		if(self.imageTween) self.imageTween.stop();
		self.imageTween = new Tween(self, 800, {
			imageX: -148,
			ease: Ease.easeOut.quint,
			onComplete: function(){
				// stuff
			}
		});

		// Animate bar in
		if(self.barTween) self.barTween.stop();
		self.barTween = new Tween(self.bottomBar, 400, {rotation: 0, y: 44, ease: Ease.easeOut.quint});
		self.bottomBar.visible = true;
		self.bottomBar.show();
	}

	this.rollOut = function(){
		if(!self.isTriangle || self.toggling || self.out) return false;
		self.out = true;

		// Make sure we're rendering
		self.dispatchEvent({name: TriangleMask.START_RENDERING, triangle: self});

		// Animate
		if(self.tiltTween) self.tiltTween.stop();
		self.tiltTween = new Tween(self, 600, {
			maskAngle: 0,
			cornerRadius: 10,
			ease: Ease.easeOut.quint,
			onComplete: function(){
				// stuff
			}
		});

		// Animate
		if(self.imageTween) self.imageTween.stop();
		self.imageTween = new Tween(self, 800, {
			imageX: -254,
			ease: Ease.easeOut.quint,
			onComplete: function(){
				self.dispatchEvent({name: TriangleMask.STOP_RENDERING, triangle: self});
				self.bottomBar.visible = false;
				self.out = false;
			}
		});

		// Tween out bar
		if(self.barTween) self.barTween.stop();
		self.barTween = new Tween(self.bottomBar, 400, {rotation: 20, y: 100, ease: Ease.easeIn.quint});
		self.bottomBar.hide();
	}

	this.toString = function(){
		return "[Sprite TriangleMask]";
	}

	this.__construct__();
}
