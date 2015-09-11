var TraditionalSprite = function(data, element){
	this.element = element;
	this.data = data;
	this.currentFrame = 1;
	this.totalFrames = data.length;
	this.startFrame;
	this.endFrame;
	this.repeat = null;
	this.count = 0;
	this.playing = false;

	var self = this;

	this.progress = function(e){
		var direction = (self.startFrame > self.endFrame) ? -1 : 1;

		if(self.currentFrame == self.endFrame){
			if(self.repeat !== self.count){
				self.currentFrame = self.startFrame;
				self.count++;
				self.update();
			} else {
				self.stop(self.endFrame);
				self.count = 0;
			}

			return false;
		}

		self.currentFrame += direction;
		self.update();
	}

	this.update = function(){
		var data = self.data[self.currentFrame - 1].textureRect;
		self.element.style.backgroundPosition = -data.x + "px " + -data.y + "px";
	}

	this.play = function(repeat, startFrame, endFrame){
		if(!this.playing){
			this.repeat = repeat;
			this.startFrame = startFrame || this.currentFrame;
			this.endFrame = endFrame || this.totalFrames;

			GlobalEvents.addListener(GlobalEvent.RENDER_FRAME, this.progress);
			this.playing = true;
		}
	}

	this.stop = function(frame){
		frame = frame || this.currentFrame;

		this.currentFrame = frame;
		this.update();

		GlobalEvents.removeListener(GlobalEvent.RENDER_FRAME, this.progress);
		this.playing = false;
	}
}
