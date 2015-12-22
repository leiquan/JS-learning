var Utils = {
	getCoords: function(obj){
		var curLeft = 0;
		var curTop = 0;

		if(obj.offsetParent){
			while(1){
				curLeft += obj.offsetLeft;
				curTop += obj.offsetTop;
				if(!obj.offsetParent) break;
				obj = obj.offsetParent;
			}
		} else if(obj.x){
			curLeft += obj.x;
			curTop += obj.y;
		}

		return {x: curLeft, y: curTop};
	},

	isChild: function(p, c){
		if(!c.parentNode) return false;
		pn = c.parentNode;
		if(pn == p) return true;
		return Utils.isChild(p, pn)
	},

	getWindowSize: function() {
		var w = 0, h = 0;

		if(typeof(window.innerWidth ) == 'number' ){
			w = window.innerWidth;
			h = window.innerHeight;
		} else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)){
			w = document.documentElement.clientWidth;
			h = document.documentElement.clientHeight;
		} else if(document.body && (document.body.clientWidth || document.body.clientHeight)){
			w = document.body.clientWidth;
			h = document.body.clientHeight;
		}

		return {width: w, height: h};
	},

	getWindowScroll: function() {
		var scrOfX = 0, scrOfY = 0;

		if(typeof(window.pageYOffset) == 'number'){
			scrOfY = window.pageYOffset;
			scrOfX = window.pageXOffset;
		} else if(document.body && (document.body.scrollLeft || document.body.scrollTop)){
			scrOfY = document.body.scrollTop;
			scrOfX = document.body.scrollLeft;
		} else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)){
			scrOfY = document.documentElement.scrollTop;
			scrOfX = document.documentElement.scrollLeft;
		}

		return {x: scrOfX, y: scrOfY}
	}
}
