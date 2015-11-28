var Triangle = function(canvas, shot){
	var self = this;

	this.shot = shot;
	this.img = new Image();
	this.stage = new Stage(canvas);
	this.triangleMask;

	this.__construct__ = function(){

		// Triangle mask
		this.triangleMask = new TriangleMask(this.img, this.shot);
		this.triangleMask.x = 200;
		this.triangleMask.y = 174;

		// Render triangle
		this.stage.addChild(this.triangleMask);
		this.stage.render();
	}

	this.load = function(){
		this.img.src = this.shot.image_400_url || this.shot.image_url;
		this.img.onload = this.onload;
	}

	this.onload = function(){
		setTimeout(function(){
			self.stage.startRendering();
			self.triangleMask.addEventListener("triangle_ready", self.triangleReady)
			self.triangleMask.fadeIn();
		}, 250);
	}

	this.triangleReady = function(){

		// Done loading
		GlobalEvents.dispatch({name: "TriangleLoad", triangle: this});
		self.stage.stopRendering();

		// Add listeners
		self.triangleMask.addEventListener(TriangleMask.STOP_RENDERING, self.stopTriangle);
		self.triangleMask.addEventListener(TriangleMask.START_RENDERING, self.startTriangle);

		self.stage.canvas.addEventListener("mouseover", self.mouseOver, false);
		self.stage.canvas.addEventListener("mouseout", self.mouseOut, false);
	}

	this.mouseOver = function(){
		self.over = true;
		self.stopped = false;
		self.stage.enableMouse();
		self.stage.startRendering();
		self.stage.mouseOver = true;
	}

	this.mouseOut = function(){
		self.over = false;

		if(self.stopped){
			self.stage.disableMouse();
			self.stage.stopRendering();
			self.stage.mouseOver = false;
		} else {
			self.triangleMask.rollOut();
		}
	}

	this.startTriangle = function(e){
		self.stopped = false;
		self.stage.enableMouse();
		self.stage.startRendering();
		self.stage.mouseOver = true;
	}

	this.stopTriangle = function(e){
		self.stopped = true;
		console.log('hello');

		if(self.over == false){
			self.stage.disableMouse();
			self.stage.stopRendering();
			self.stage.mouseOver = false;
		}
	}

	this.__construct__();
}
