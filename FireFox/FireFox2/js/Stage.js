var Stage = function(canvas, framerate){
	var self = this;

	this.canvas = canvas;
	this.context;
	this.children;

	this.mouseColors = {};
	this.mouseCanvas;
	this.mouseContext;
	this.mouseOver = false;
	this.mouseFocus = undefined;
	this.mouseEnabled = false;

	this.layerX;
	this.layerY;

	this.__construct__ = function(){
		this.children = [];
		this.uid = Stage.getUniqueID();

		// Get canvas
		this.context = this.canvas.getContext("2d");

		// Create canvas for mouse
		this.mouseCanvas = document.createElement("canvas");
		this.mouseContext = this.mouseCanvas.getContext("2d");
		this.mouseCanvas.width = this.canvas.width;
		this.mouseCanvas.height = this.canvas.height;

		// Global stage context
		Stage.globalContext = this.context;
	}

	this.enableMouse = function(){
		if(this.mouseEnabled) return false;

		this.canvas.onmousemove = this.onMouseMove;
		this.canvas.onmouseover = this.onMouseOver;
		this.canvas.onmouseout = this.onMouseOut;
		this.canvas.onmousedown = this.onMouseDown;
		this.canvas.onmouseup = this.onMouseUp;
		this.canvas.onclick = this.onMouseClick;

		this.mouseEnabled = true;
	}

	this.disableMouse = function(){
		if(!this.mouseEnabled) return false;

		this.canvas.onmousemove = undefined;
		this.canvas.onmouseover = undefined;
		this.canvas.onmouseout = undefined;
		this.canvas.onmousedown = undefined;
		this.canvas.onmouseup = undefined;
		this.canvas.onclick = undefined;

		this.mouseEnabled = false;
		this.mouseFocus = undefined;

		this.mouseOver = false;
		for(var i = 0; i < this.children.length; i++){
			this.children[i].resetMouse();
		}
	}

	this.refreshCanvas = function(width, height){
//		self.canvas.width = self.canvas.width - 1;
//		self.canvas.width = self.canvas.width + 1;
		self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
	}

	this.refreshMouseCanvas = function(width, height){
		//self.mouseCanvas.width = self.mouseCanvas.width - 1;
		//self.mouseCanvas.width = self.mouseCanvas.width + 1;
	}

	this.startRendering = function(){
		if(!self.rendering){
			GlobalEvents.addListener(GlobalEvent.RENDER_FRAME, this.render);
			GlobalEvents.addListener(GlobalEvent.MOUSE_EVAL, this.evaluateMouse);
			self.rendering = true;
		}
	}

	this.stopRendering = function(){
		if(self.rendering){
			GlobalEvents.removeListener(GlobalEvent.RENDER_FRAME, this.render);
			GlobalEvents.removeListener(GlobalEvent.MOUSE_EVAL, this.evaluateMouse);
			self.rendering = false;
			//self.render();
		}
	}

	this.render = function(){
		//var start = new Date();
		self.refreshCanvas();
		if(self.mouseEnabled) self.refreshMouseCanvas();

		// Render children
		for(var i = 0; i < self.children.length; i++){
			var child = self.children[i];
			child.render(self.context);

			// Mouse render
			if(self.mouseEnabled){
				child.render(self.mouseContext, true);
				self.dispatchMouseEvents();
			}
		}

		//var end = new Date();
		//console.log("frame rendered in: ", (end - start));
	}

	this.dispatchMouseEvents = function(){
		if(!this.mouseOver) return;

		try {
			var imgd = this.mouseContext.getImageData(this.layerX, this.layerY, 1, 1).data;
		} catch(e) {
			return false;
		}

		var color = new RGBColor(imgd[0], imgd[1], imgd[2]).getHEX().value;
		var sprite = this.mouseColors[color];

		// Sprite
		if(sprite != this.mouseFocus){

			// Roll out
			if(this.mouseFocus){
				var ancestors = this.mouseFocus.getUncommonAncestors(sprite);
				for(var i=0; i<ancestors.length; i++){
					ancestors[i].dispatchRollOut();
				}
			}

			// Roll over
			if(sprite){
				var ancestors = sprite.getAncestry();
				for(var i=0; i<ancestors.length; i++){
					ancestors[i].dispatchRollOver();
				}
			}

			// Cursor control
			this.mouseFocus = sprite;
			this.evaluateMouse();
		}
	}

	this.evaluateMouse = function(){
		var cursor = "";
		var s = self.mouseFocus;

		// Get cursor state
		while(s){
			if(s.buttonMode){
				cursor = "pointer";
				break;
			}

			s = s.mother;
		}

		// Set cursor
		this.canvas.style.cursor = cursor;

		// Force cursor update
		window.blur();
		window.focus();
	}

	this.onMouseDown = function(e){
		if(self.mouseFocus) self.mouseFocus.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_DOWN));
	}

	this.onMouseUp = function(e){
		if(self.mouseFocus) self.mouseFocus.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_UP));
	}

	this.onMouseClick = function(e){
		if(self.mouseFocus) self.mouseFocus.dispatchEvent(new MouseEvent(MouseEvent.CLICK));
	}

	this.onMouseOver = function(e){
		self.canvas.onmousemove = self.onMouseMove;
		self.mouseOver = true;
	}

	this.onMouseOut = function(e){
		if(self.mouseFocus){
			var ancestors = self.mouseFocus.getAncestry();
			for(var i=0; i<ancestors.length; i++){
				ancestors[i].dispatchRollOut();
			}
		}

		self.canvas.onmousemove = undefined;
		self.mouseFocus = false;
		self.mouseOver = false;
	}

	this.onMouseMove = function(e){
		self.layerX = (e.offsetX == undefined) ? e.layerX : e.offsetX;
		self.layerY = (e.offsetY == undefined) ? e.layerY : e.offsetY;
	}

	this.addChild = function(child){
		this.children.push(child);
		child.setStage(this);
		child.mother = this;
	}

	this.removeChild = function(child){
		var i = this.children.indexOf(child);
		if(i == -1) throw child + " is not a child of " + this;

		this.children.splice(i, 1);
		child.setStage(null);
		child.mother = null;
	}

	this.addMouseColor = function(sprite){
		this.mouseColors[sprite.mouseColor.value] = sprite;
	}

	this.removeMouseColor = function(sprite){
		delete this.mouseColors[sprite.mouseColor.value];
	}

	this.dispatchEvent = function(e){
		Events.dispatch(this, e);
	}

	this.addEventListener = function(e, f){
		Events.addListener(this, e, f);
	}

	this.removeEventListener = function(e, f){
		Events.removeListener(this, e, f);
	}

	this.dispatchRollOver = function(){
		if(!this.over && this.mouseEnabled){
			this.dispatchEvent(new MouseEvent(MouseEvent.ROLL_OVER));
			this.over = true;
		}
	}

	this.dispatchRollOut = function(){
		if(this.over && this.mouseEnabled){
			this.dispatchEvent(new MouseEvent(MouseEvent.ROLL_OUT));
			this.over = false;
		}
	}

	this.toString = function(){
		return "[object Stage]";
	}

	this.__construct__();
}

Stage.r = 0;
Stage.g = 0;
Stage.b = 0;
Stage.uid = 0;
Stage.renderEvent = new GlobalEvent(GlobalEvent.RENDER_FRAME);

Stage.getUniqueID = function(){
	return ++Stage.uid;
}

Stage.getMouseColor = function(){
	Stage.r += 1;

	if(Stage.r > 255){
		Stage.r = 0;
		Stage.g++;
	}

	if(Stage.g > 255){
		Stage.r = 0;
		Stage.g = 0;
		Stage.b++;
	}

	return new RGBColor(Stage.r, Stage.g, Stage.b).getHEX();
}

Stage.init = function(framerate){
	Stage.framerate = framerate;
	var fps = Math.round((1 / framerate) * 1000);
	Stage.renderInterval = setInterval(Stage.renderFrame, fps);
}

Stage.renderFrame = function(){
	GlobalEvents.dispatch(Stage.renderEvent);
}

Stage.suspend = function(){
	clearInterval(Stage.renderInterval);
}
