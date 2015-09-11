var Sprite = function(){
	this.stage;
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.rotation = 0;
	this.alpha = 1;
	this.visible = true;
	this.uid = Stage.getUniqueID();
	this.mouseColor = Stage.getMouseColor();
	this.mouseString = this.mouseColor.toStringCSS();
	this.mouseEnabled = false;
	this.children = [];
	this.mother;

	this.render = function(context, mouse){
		if(!this.stage || !this.visible) return;

		// Save context state
		context.save();
		context.translate(this.x, this.y);
		context.scale(this.scaleX, this.scaleY);
		context.rotate(this.rotation * (Math.PI / 180));

		// Draw sprite
		if(mouse){
			if(this.mouseEnabled) this.mouseDraw(context);
		} else {
			context.globalAlpha *= this.alpha;
			this.draw(context);
		}

		// Draw children
		for(var i = 0; i < this.children.length; i++){
			this.children[i].render(context, mouse);
		}

		// Restore context
		this.afterDraw(context);
		context.restore();
	}

	this.setStage = function(stage){
		if(stage && !this.stage){
			stage.addMouseColor(this);
		} else if(!stage && this.stage){
			this.stage.removeMouseColor(this);
		}

		this.stage = stage;
		for(var i = 0; i < this.children.length; i++){
			var child = this.children[i];
			child.setStage(stage);
		}
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
		if(!this.mouseOver && this.mouseEnabled){
			this.dispatchEvent(new MouseEvent(MouseEvent.ROLL_OVER));
			this.mouseOver = true;
		}
	}

	this.dispatchRollOut = function(){
		if(this.mouseOver && this.mouseEnabled){
			this.dispatchEvent(new MouseEvent(MouseEvent.ROLL_OUT));
			this.mouseOver = false;
		}
	}

	this.resetMouse = function(){
		this.mouseOver = false;
		for(var i = 0; i < this.children.length; i++){
			this.children[i].resetMouse();
		}
	}

	this.addChild = function(child){
		this.children.push(child);
		child.setStage(this.stage);
		child.mother = this;
	}

	this.removeChild = function(child){
		var index = this.getChildIndex(child);
		this.children.splice(index, 1);
		child.setStage(null);
		child.mother = null;
		child.resetMouse();
	}

	this.setChildIndex = function(child, newIndex){
		var oldIndex = this.getChildIndex(child);
		this.children.splice(oldIndex, 1);
		this.children.splice(newIndex, 0, child);
	}

	this.getChildIndex = function(child){
		var i = this.children.indexOf(child);
		if(i == -1) throw child + " is not a child of " + this;
		return i;
	}

	this.isChildOf = function(mother){
		if(!mother) return false;
		if(mother == this.mother) return true;
		else return this.isChildOf(mother.mother);
	}

	this.getAncestry = function(){
		var s = this;
		var ancestry = [this];

		while(s.mother){
			ancestry.push(s.mother);
			s = s.mother;
		}

		return ancestry;
	}

	this.getProgeny = function(){
		var progeny = [this];
		for(var i=0; i<this.children.length; i++){
			progeny.concat(this.children[i].getProgeny());
		}

		return progeny;
	}

	// Return ancestors
	this.getUncommonAncestors = function(sprite){
		if(!sprite) return this.getAncestry();
		var myAncestors = this.getAncestry();
		var theirAncestors = sprite.getAncestry();

		for(var i=0; i<theirAncestors.length; i++){
			var index = myAncestors.indexOf(theirAncestors[i]);
			if(index != -1) myAncestors.splice(index, 1);
		}

		return myAncestors;
	}

	// Drawing stuff in here
	this.draw = function(context){}
	this.mouseDraw = function(context){}
	this.afterDraw = function(context){}

	// String representation of object
	this.toString = function(){
		return "[object Sprite]";
	}
}
