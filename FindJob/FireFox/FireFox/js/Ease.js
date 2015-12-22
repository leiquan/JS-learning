/**
 * EASING EQUATIONS - TERMS OF USE
 * Copyright (c) 2001 Robert Penner All rights reserved.
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

Ease = {
	// No ease
	linear: function (t, b, c, d) { 
		return c*t/d + b;
	},

	easeOut: {
		// Quadratic
		quad: function(t, b, c, d){
			return -c * (t/=d)*(t-2) + b;
		},

		// Cubic
		cubic: function(t, b, c, d){
			return c * (Math.pow(t/d-1, 3) + 1) + b; 
		},
		
		// Quartic
		quart: function(t, b, c, d){
			return -c * (Math.pow(t/d-1, 4) - 1) + b; 
		},
		
		// Quintic
		quint: function(t, b, c, d){
			return c * (Math.pow(t/d-1, 5) + 1) + b; 
		},
		
		// Sinusoidal
		sine: function(t, b, c, d){
			return c * Math.sin(t/d * (Math.PI/2)) + b; 
		},
		
		// Exponential
		expo: function(t, b, c, d){
			return c * (-Math.pow(2, -10 * t/d) + 1) + b; 
		},
		
		// Circular
		circ: function(t, b, c, d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b; 
		},

		// Bounce
		bounce: function(t, b, c, d){
			if((t/=d) < (1/2.75)){
				return c*(7.5625*t*t) + b;
			} else if(t < (2/2.75)){
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if(t < (2.5/2.75)){
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},

		back: function(t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		}
	},

	easeIn: {
		// Quadratic
		quad: function(t, b, c, d){
			return c*(t/=d)*t + b; 
		},

		// Cubic
		cubic: function(t, b, c, d){
			return c * Math.pow(t/d, 3) + b;
		},

		// Quartic
		quart: function(t, b, c, d){
			return c * Math.pow(t/d, 4) + b; 
		},
				
		// Quintic
		quint: function(t, b, c, d){
			return c * Math.pow(t/d, 5) + b; 
		},
		
		// Sinusoidal
		sine: function(t, b, c, d){
			return c * (1 - Math.cos(t/d * (Math.PI/2))) + b; 
		},
		
		// Exponential
		expo: function(t, b, c, d){
			return c * Math.pow(2, 10 * (t/d - 1)) + b; 
		},
		
		// Circular
		circ: function(t, b, c, d){
			return c * (1 - Math.sqrt(1 - (t/=d)*t)) + b; 
		},
		
		// Bounce
		bounce: function(t, b, c, d){
			return c - Ease._out.bounce(d-t, 0, c, d) + b;
		},

		// Back
		back: function(t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		}
	},

	easeInOut: {
		// Quadratic
		quad: function(t, b, c, d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},

		// Cubic
		cubic: function(t, b, c, d){
			if ((t/=d/2) < 1) return c/2 * Math.pow(t, 3) + b;
			return c/2 * (Math.pow(t-2, 3) + 2) + b; 
		},

		// Quartic
		quart: function(t, b, c, d){
			if ((t/=d/2) < 1) return c/2 * Math.pow (t, 4) + b; 
			return -c/2 * (Math.pow(t-2, 4) - 2) + b; 
		},

		// Quintic
		quint: function(t, b, c, d){
			if ((t/=d/2) < 1) return c/2 * Math.pow (t, 5) + b; 
			return c/2 * (Math.pow(t-2, 5) + 2) + b; 
		},

		// Sinusoidal
		sine: function(t, b, c, d){
			return c/2 * (1 - Math.cos(Math.PI*t/d)) + b; 
		},

		// Exponential
		expo: function(t, b, c, d){
			if((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b; 
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b; 
		},

		// Circular
		circ: function(t, b, c, d){
			if ((t/=d/2) < 1) return c/2 * (1 - Math.sqrt(1 - t*t)) + b; 
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b; 
		},

		// Bounce
		bounce: function(t, b, c, d){
			if (t < d/2) return Ease._in.bounce(t*2, 0, c, d) * .5 + b;
			else return Ease._out.bounce(t*2-d, 0, c, d) * .5 + c*.5 + b;
		},

		// Back
		back: function(t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	}
}
