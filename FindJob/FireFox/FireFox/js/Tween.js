/**
 * TWEEN - TERMS OF USE
 * Copyright (c) 2008 Weston Pearce All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without 
 * modification, are permitted provided the following conditions are 
 * met:
 *
 * Redistributions of source code must retain the above copyright 
 * notice, this list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright 
 * notice, this list of conditions and the following disclaimer in the 
 * documentation and/or other materials provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be 
 * used to endorse or promote products derived from this software 
 * without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT 
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS 
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE 
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, 
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS 
 * OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, 
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT 
 * OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
 * SUCH DAMAGE.
 */

/**
 * @projectDescription 	Javascript tween library.
 * @author				Weston Pearce wespear@gmail.com
 * @version				1.0
 */

/**
 * This class changes object properties over a period of frames using 
 * tweening formulae.
 * 
 * @param	{Object}	obj			The object to be manipulated.
 * @param	{String}	prop		The property to tween.
 * @param	{Function}	ease		The easing formula to use.
 * @param	{Number}	begin		The initial value of the tween.
 * @param	{Number}	end			The final value of the tween.
 * @param	{Number}	frames		The number of frames to animate over.
 * @param	{Function}	callback	A function to call on completion.
 * 
 * @return {Tween} Returns a new Tween.
 * @constructor
 */
var Tween = function(obj, time, props){

	/**
	 * The total time of the current animation in milliseconds
	 * @alias Tween.frame
	 * @type {Integer}
	 */
	this.time;

	/**
	 * When the animation should stop
	 * @alias Tween.startTime
	 * @type {Date}
	 */
	this.endAt;

	/**
	 * The easing forumla to be used
	 * @alias Tween.ease
	 * @type {Function}
	 */
	this.ease = function(t, b, c, d){return c * t / d + b;}

	/**
	 * Execute on tween complete
	 * @alias Tween.onComplete
	 * @type {Function}
	 */
	this.onComplete = function(){};
	
	/**
	 * Execute on tween update
	 * @alias Tween.onComplete
	 * @type {Function}
	 */
	this.onUpdate = function(){};

	/**
	 * The Interval running the animation.
	 * @alias Tween.running
	 * @type {Interval}
	 */
	this.running = null;

	/**
	 * Append string to calculation result
	 * @alias Tween.units
	 * @type {String}
	 */
	this.units = '';
	
	/**
	 * Append string before calculation result
	 * @alias Tween.prefix
	 * @type {String}
	 */
	this.prefix = '';

	/**
	 * Delay before playing
	 * @alias Tween.delay
	 * @type {Number}
	 */
	this.delay = 0;
	
	/**
	 * Begin values
	 * @alias Tween.begin
	 * @type {Object}
	 */
	this.begin = {};

	// Closure ref
	var self = this;

	/**
	 * Tween constructor
	 */
	this.__construct__ = function(){
		this.time = time;
		this.obj = obj;

		this.id = Tween.getId();
		Tween.tweens[this.id] = this;

		if(props.onComplete){
			this.onComplete = props.onComplete;
			delete props.onComplete;
		}

		if(props.onUpdate){
			this.onUpdate = props.onUpdate;
			delete props.onUpdate;
		}

		if(props.ease){
			this.ease = props.ease;
			delete props.ease;
		}

		if(props.delay){
			this.delay = props.delay;
			delete props.delay;
		}

		for(prop in props){
			this.begin[prop] = obj[prop];
		}

		this.playTimeout = setTimeout(function(){
			self.play();
		}, this.delay);
	}

	/**
	 * This method plays the animation.
	 * @alias Tween.play
	 * @method
	 */
	this.play = function(){
		if(!Tween.tweens[obj]) Tween.tweens[obj] = [];
		Tween.tweens[obj].push(this);

		this.endAt = new Date().getTime() + this.time;
		GlobalEvents.addListener(GlobalEvent.RENDER_FRAME, this.mechanism);
	}

	/**
	 * This method stops the animation.
	 * @alias Tween.stop
	 * @method
	 */
	this.stop = function(){
		clearTimeout(self.playTimeout);
		GlobalEvents.removeListener(GlobalEvent.RENDER_FRAME, self.mechanism);
		self.stopped = true;
	}

	/**
	 * This function progresses the animation
	 * @alias Tween.mechanism
	 * @type {Function}
	 */
	this.mechanism = function(){
		if(self.stopped) return false;
		var timeLeft = self.endAt - new Date().getTime();

		if(timeLeft <= 0){
			self.stop();
			self.advanceFrame(1, 1);
			self.onUpdate();
			self.onComplete();
		} else {
			self.advanceFrame(self.time - timeLeft, self.time);
			self.onUpdate();
		}
	}

	this.advanceFrame = function(frame, frames){
		for(prop in props){
			b = this.begin[prop], e = props[prop], m = e - b;
			obj[prop] = this.ease(frame, b, m, frames);
		}
	}

	// Construct the tween
	this.__construct__();
}

Tween.id = 0;
Tween.tweens = {};
Tween.killTweensOf = function(obj){
	for(var x in Tween.tweens){
		var t = Tween.tweens[x];
		if(t.obj == obj) t.stop();
	}
}
Tween.getId = function(){
	return ++Tween.id;
}
