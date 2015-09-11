var Rally = function(){
	var self = this;
	this.expanded = false;
	this.trianglesInner;
	this.triangles;
	this.pagesDiv;
	this.pages;
	this.loadIndex = 0;

	// Some props for tweening
	this.props = {
		height: 0,
		bioBg: 0,
		bioHeight: 0,
		statColor: {r: 0, g: 0, b: 0, a: 0},
		stats: {a: 0, b: 0, c: 0},
		title: {x: 0, alpha: 0},
		topAlpha: 0,
		scroll: 0
	}

	// Constructor
	this.__construct__ = function(){

		// Rally nav
		//this.nav = new RallyNav(document.getElementById("nav"));
		//this.arrows = document.getElementById("arrows");

		// Dribbble triangles
		this.trianglesInner = document.getElementById("trianglesInner");

		

		

		// Bios stuff
		//this.bios = document.getElementById("bios");
		//this.biosInner = document.getElementById("biosInner");
		//this.bioToggle = document.getElementById("bioToggle");
		//this.bioToggle.onclick = this.bioClick;
		//this.bioToggle.onmouseout = this.bioOut;
		//this.bioToggle.onmouseover = this.bioOver;

		// Set up bios
		//var bios = this.biosInner.getElementsByTagName("div");
		//for(var i=0; i<bios.length; i++){
		//	var div = bios[i];

		//	if(div.className == "bio"){
		//		var items = div.getElementsByTagName("li");

				// Bio links
		//		var inLink = items[0].getElementsByTagName("a")[0];
		//		var tweetLink = items[1].getElementsByTagName("a")[0];
		//		var shareLink = items[2].getElementsByTagName("a")[0];

				// Sprite Animations
		//		new SpriteLink(BioIn, inLink);
		//		new SpriteLink(BioShare, shareLink);
		//		new SpriteLink(BioTweet, tweetLink);
		//	}
		//}

		// More sprites
		var stalkDiv = document.getElementById("stalk");
	//	var stalkLinks = stalkDiv.getElementsByTagName("a");
		//new SpriteLink(BigTweet, stalkLinks[0]);
		//new SpriteLink(BigShare, stalkLinks[1]);

		// Page titles
		//var titleList = document.getElementById("titles");
		//this.titles = titleList.getElementsByTagName("li");

		// Create pages
		//var divs = document.getElementsByTagName("div");
		//var id = this.nav.selected.id.replace("nav", "").toLowerCase();
		//this.pages = [];

		

		// Update active buttons
		//this.updateButtons(this.currentPage.index);

		// Set page height
		//var height = this.currentPage.div.offsetHeight;
	//	this.pagesDiv = document.getElementById("pages");
		//this.pagesDiv.style.height = height + "px";
		//this.props.height = height;

		// History stuff
		//GlobalEvents.addListener("NavClick", this.navClick);
		//GlobalEvents.addListener("ArrowOver", this.arrowOver);
		//GlobalEvents.addListener("ArrowOut", this.arrowOut);
		//GlobalEvents.addListener("TriangleToggleIn", this.toggleIn);
		//GlobalEvents.addListener("TriangleToggleOut", this.toggleOut);

		// On pop state
	//	window.onscroll = this.scrollHandler;
	//	window.onpopstate = this.onPopState;
	//	window.onresize = this.onResize;
	//	window.onorientationchange = this.onOrient;
	//	window.onkeydown = this.onKeyDown;

		// On window resize
		this.onResize();
		if(this.isMobileSafari()){
			document.getElementById("footer").className = "noFixed";
		}
	}

	// Check for mobile safari
	this.isMobileSafari = function(){
		if(/(iPod|iPhone|iPad)/.test(navigator.userAgent)){
			return true
		}
	}

	// iOS stuff
	this.onOrient = function(e){
		document.getElementById("iview").setAttribute('content','user-scalable=no, width=device-width, minimum-scale=1.0, maximum-scale=1.0');
		self.onResize();
	}

	// Keydown
	this.onKeyDown = function(e){
		if(e.keyCode == 39){
			self.arrowNext(null);
		} else if(e.keyCode == 37){
			self.arrowBack(null);
		}
	}

	this.onResize = function(e){

		// Get window size
		var s = Utils.getWindowSize();
		var mode = null;

		// Compare
		if(s.width > 1240){
			mode = "giant";
		} else if(s.width > 1040){
			mode = "big";
		} else if(s.width > 840){
			mode = "medium";
		} else {
			mode = "small";
		}

		// Change mode
		if(self.mode == mode) return false;
		document.body.className = mode;

		// Update bio section
		//if(self.bioTween) self.bioTween.stop();
		//if(self.expanded){
		///	self.bios.style.height = self.biosInner.offsetHeight + "px";
		//} else {
		//	self.bios.style.height = "0px";
		//}

		
	}

	this.onTopClick = function(e){
		var scroll = Utils.getWindowScroll();
		self.props.scroll = scroll.y;

		var update = function(){
			window.scrollTo(0, self.props.scroll);
		}

		if(self.scrollTween) self.scrollTween.stop();
		self.scrollTween = new Tween(self.props, 400, {scroll: 0, ease: Ease.easeOut.expo, onUpdate: update});
		return false;
	}

	this.onTopOver = function(e){
		if(self.topShowing){
			var update = function(){
				self.topLink.style.opacity = self.props.topAlpha;
			}

			if(self.topTween) self.topTween.stop();
			self.topTween = new Tween(self.props, 600, {topAlpha: 1, ease: Ease.easeOut.sine, onUpdate: update});
		}
	}

	this.onTopOut = function(e){
		if(self.topShowing){
			var update = function(){
				self.topLink.style.opacity = self.props.topAlpha;
			}

			if(self.topTween) self.topTween.stop();
			self.topTween = new Tween(self.props, 600, {topAlpha: .8, ease: Ease.easeOut.sine, onUpdate: update});
		}
	}

	this.scrollHandler = function(e){
		var scroll = Utils.getWindowScroll();

		// Fade in top link
		if(scroll.y > 60 && !self.topShowing){
			var update = function(){
				self.topLink.style.opacity = self.props.topAlpha;
			}

			// Top tween
			if(self.topTween) self.topTween.stop();
			self.topTween = new Tween(self.props, 600, {topAlpha: .8, ease: Ease.easeOut.sine, onUpdate: update});
			self.topLink.style.display = "inline-block";
			self.topShowing = true;

		// Fade out top link
		} else if(scroll.y < 60 && self.topShowing){
			var update = function(){
				self.topLink.style.opacity = self.props.topAlpha;
			}

			// Top tween
			if(self.topTween) self.topTween.stop();
			self.topTween = new Tween(self.props, 600, {topAlpha: 0, ease: Ease.easeOut.sine, onUpdate: update, onComplete: function(){
				self.topLink.style.display = "none";
			}});

			self.topShowing = false;
		}
	}

	this.toggleIn = function(e){
		if(e.triangle != self.activeTriangle){
			if(self.activeTriangle){
				self.activeTriangle.triangleMorph();
			}
		}

		self.activeTriangle = e.triangle;
	}

	this.toggleOut = function(e){
		if(e.triangle == self.activeTriangle){
			self.activeTriangle = null;
		}
	}

	this.createTriangles = function(data){

		// Create triangles
		this.triangles = [];
		
		//for(var i=0; i<5; i++){
		for(var i=0; i<data.shots.length; i++){
			var shot = data.shots[i];
			if(/\(\*\)/g.test(shot.title)) continue;

			// Create a canvas
			var canvas = document.createElement("canvas");
			canvas.id = "canvas" + i;
			canvas.width = 400;
			canvas.height = 330;

			// Create triangle
			var triangle = new Triangle(canvas, shot);

			// Draw triangle from dibbble
			this.triangles.push(triangle);
			this.trianglesInner.appendChild(triangle.stage.canvas);
			//this.trianglesInner.appendChild(triangle.stage.mouseCanvas);
		}

		GlobalEvents.addListener("TriangleLoad", this.triangleLoad);
		this.triangles[0].load();
	}

	this.triangleLoad = function(){
		var triangle = self.triangles[++self.loadIndex];
		if(triangle) triangle.load();
	}

	this.onScroll = function(){
	}

	this.arrowOut = function(e){
		var d = (e.arrow == self.next) ? 1 : -1;
		var index = self.currentPage.index;
		var title = self.titles[index + d];
		var style = (d > 0) ? "marginRight" : "marginLeft";

		var update = function(){
			title.style[style] = title.x + "px";
			title.style.opacity = title.alpha;
		}

		if(title.tween) title.tween.stop();
		title.tween = new Tween(title, 600, {x: -50, alpha: 0, ease: Ease.easeOut.quint, onUpdate: update});
	}

	this.arrowOver = function(e){
		var index = self.currentPage.index;
		var d = (e.arrow == self.next) ? 1 : -1;
		var title = self.titles[index + d];
		var margin = -50;
		var style;

		if(d > 0) {
			title.style.right = "0";
			title.style.left = "auto";
			style = "marginRight";
		} else {
			title.style.left = "0";
			title.style.right = "auto";
			style = "marginLeft";
		}

		var update = function(){
			title.style[style] = title.x + "px";
			title.style.opacity = title.alpha;
		}

		title.style.display = "block";
		title.style[style] = margin + "px";
		title.style.opacity = 0;

		title.x = margin;
		title.alpha = 0;

		if(title.tween) title.tween.stop();
		title.tween = new Tween(title, 600, {x: 0, alpha: 1, ease: Ease.easeInOut.quint, onUpdate: update});
	}

	this.bioClick = function(e){
		if(self.bioTween) self.bioTween.stop();
		if(self.statTween) self.statTween.stop();

		var updateHeight = function(){
			//self.bios.style.height = self.props.bioHeight + "px";
			self.pagesDiv.style.height = self.currentPage.div.offsetHeight + "px";
		}
		var updateColor = function(){
			var c = self.props.statColor;
			self.stats.style.color = new RGBColor(c.r, c.g, c.b).getHEX().toStringCSS();
			self.statsDark.style.opacity = c.a;
		}

		var ease = Ease.easeInOut.quint;

		if(self.expanded){
			self.statTween = new Tween(self.props.statColor, 600, {r: 46, g: 44, b: 42, a: 0, onUpdate: updateColor});
			self.bioTween = new Tween(self.props, 600, {bioHeight: 0, ease: ease, onUpdate: updateHeight});
			self.bioToggle.style.backgroundImage = "url(http://www.chainsout.com/toggle-down.png)";
			self.bioToggle.innerHTML = "查看开发者";
			self.expanded = false;
		} else {
			self.statTween = new Tween(self.props.statColor, 600, {r: 245, g: 240, b: 235, a: 1, ease: ease, onUpdate: updateColor});
			//self.bioTween = new Tween(self.props, 600, {bioHeight: self.biosInner.offsetHeight, ease: ease, onUpdate: updateHeight});
			self.bioToggle.style.backgroundImage = "url(http://www.chainsout.com/toggle.png)";
			self.bioToggle.innerHTML = "隐藏";
			self.expanded = true;
		}

		return false;
	}

	this.bioOver = function(e){
		var update = function(){
			self.bioToggle.style.backgroundPosition = "5px " + Math.round(self.props.bioBg) + "px";
		}

		if(self.toggleTween) self.toggleTween.stop();
		self.toggleTween = new Tween(self.props, 300, {bioBg: -33, ease: Ease.easeOut.sine, onUpdate: update});
		return false;
	}

	this.bioOut = function(e){
		var update = function(){
			self.bioToggle.style.backgroundPosition = "5px " + Math.round(self.props.bioBg) + "px";
		}

		if(self.toggleTween) self.toggleTween.stop();
		self.toggleTween = new Tween(self.props, 300, {bioBg: 0, ease: Ease.easeOut.sine, onUpdate: update});
		return false;
	}

	this.onPopState = function(e){
		if(self.ignorePop){
			self.ignorePop = false;
			return false;
		}

		indices = {
			"/": 0,
			"/about/": 1,
			"/clients/": 2,
			"/contact/": 3
		}

		var index = indices[window.location.pathname];
		var page = self.pages[index];

		self.changePage(page);
		self.nav.select(index);
	}

	this.updateHistory = function(page){
		var name = "/" + page.div.id + "/";
		if(name == "/home/") name = "/";

		try {
			//history.pushState({pageIndex: page.index}, "Rally Interactive", name)
		} catch(e) {
			// doh
		}
	}

	this.updateButtons = function(index){
		var totalPages = self.pages.length - 1;

		self.next.enable();
		if(index == totalPages) self.next.disable();

		self.back.enable();
		if(index == 0) self.back.disable();
	}

	this.animateSection = function(nextPage, d){

		var oldHeight = self.currentPage.div.offsetHeight;
		var newHeight = nextPage.div.offsetHeight;
		self.props.height = oldHeight;

		var delay = 200;
		if(oldHeight < newHeight) delay = 0;

		self.currentPage.slideOut(-250 * d);
		self.currentPage = nextPage;
		nextPage.slideIn(250 * d);

		if(nextPage.div.id == "about"||nextPage.div.id == "about2"){
			this.countUp();
			this.countUp2();
		}

		var props = {
			delay: delay,
			height: self.currentPage.div.offsetHeight,
			ease: Ease.easeInOut.expo,
			onUpdate: function(){
				self.pagesDiv.style.height = self.props.height + "px";
			}
		}

		if(self.heightTween) self.heightTween.stop();
		self.heightTween = new Tween(self.props, 800, props);
	}

	this.changeSection = function(nextPage, d){

		// Update height
		var oldHeight = self.currentPage.div.offsetHeight;
		var newHeight = nextPage.div.offsetHeight;
		self.pagesDiv.style.height = newHeight + "px";

		// Hide current page
		if(self.currentPage.tween) self.currentPage.tween.stop();
		self.currentPage.div.style.marginLeft = "-9999px";
		self.currentPage.intro.style.marginLeft = "0";
		self.currentPage.intro.style.opacity = "1";
		self.currentPage.content.style.opacity = "0";

		// Update current page
		self.currentPage = nextPage;

		// Show next page
		if(self.currentPage.tween) self.currentPage.tween.stop();
		self.currentPage.div.style.marginLeft = "0";
		self.currentPage.intro.style.marginLeft = "0";
		self.currentPage.intro.style.opacity = "1";
		self.currentPage.content.style.opacity = "1";
	}

	this.countUp = function(){

		var statsPersons = document.getElementById("statsPersons");
		var statsDirect = document.getElementById("statsDirect");
		var statsPartnerships = document.getElementById("statsPartnerships");

		statsPersons.innerHTML = "00";
		statsDirect.innerHTML = "00";
		statsPartnerships.innerHTML = "00";

		var s = self.props.stats;
		s.a = 0;
		s.b = 0;
		s.c = 0;

		var update1 = function(){
			var a = Math.round(s.a);
			statsPersons.innerHTML = (a < 10) ? "0" + a : a;
		}

		var update2 = function(){
			var b = Math.round(s.b);
			statsDirect.innerHTML = (b < 10) ? "0" + b : b;
		}

		var update3 = function(){
			var c = Math.round(s.c);
			statsPartnerships.innerHTML = (c < 10) ? "0" + c : c;
		}

		if(this.numberTween1) this.numberTween1.stop();
		if(this.numberTween2) this.numberTween2.stop();
		if(this.numberTween3) this.numberTween3.stop();

		this.numberTween1 = new Tween(this.props.stats, 800, {delay: 400, ease: Ease.easeOut.sine, a: 3, onUpdate: update1});
		this.numberTween2 = new Tween(this.props.stats, 800, {delay: 600, ease: Ease.easeOut.sine, b: 80, onUpdate: update2});
		this.numberTween3 = new Tween(this.props.stats, 800, {delay: 800, ease: Ease.easeOut.sine, c: 20, onUpdate: update3});
	}
	
		this.countUp2 = function(){

		var statsPersons = document.getElementById("statsPersons2");
		var statsDirect = document.getElementById("statsDirect2");
		var statsPartnerships = document.getElementById("statsPartnerships2");

		statsPersons.innerHTML = "00";
		statsDirect.innerHTML = "00";
		statsPartnerships.innerHTML = "00";

		var s = self.props.stats;
		s.a = 0;
		s.b = 0;
		s.c = 0;

		var update1 = function(){
			var a = Math.round(s.a);
			statsPersons.innerHTML = (a < 10) ? "0" + a : a;
		}

		var update2 = function(){
			var b = Math.round(s.b);
			statsDirect.innerHTML = (b < 10) ? "0" + b : b;
		}

		var update3 = function(){
			var c = Math.round(s.c);
			statsPartnerships.innerHTML = (c < 10) ? "0" + c : c;
		}

		if(this.numberTween1) this.numberTween1.stop();
		if(this.numberTween2) this.numberTween2.stop();
		if(this.numberTween3) this.numberTween3.stop();

		this.numberTween1 = new Tween(this.props.stats, 800, {delay: 400, ease: Ease.easeOut.sine, a: 3, onUpdate: update1});
		this.numberTween2 = new Tween(this.props.stats, 800, {delay: 600, ease: Ease.easeOut.sine, b: 80, onUpdate: update2});
		this.numberTween3 = new Tween(this.props.stats, 800, {delay: 800, ease: Ease.easeOut.sine, c: 20, onUpdate: update3});
	}

	this.changePage = function(page){
		if(page == self.currentPage) return false;

		var dir = (page.index - self.currentPage.index > 0) ? 1 : -1;

		(document.body.className == "small") ?
			self.changeSection(page, dir):
			self.animateSection(page, dir);

		self.updateButtons(page.index);
	}

	this.navClick = function(e){
		var page = self.pages[e.item.index];
		self.updateHistory(page);
		self.changePage(page);
	}

	this.arrowNext = function(e){
		if(self.next.disabled) return false;

		var nextIndex = self.currentPage.index + 1;
		var nextPage = self.pages[nextIndex];

		var title = self.titles[nextIndex];
		var update = function(){
			title.style.marginRight = title.x + "px";
			title.style.opacity = title.alpha;
		}

		if(title.tween) title.tween.stop();
		title.tween = new Tween(title, 300, {x: 25, alpha: 0, ease: Ease.easeOut.quint, onUpdate: update});

		self.updateHistory(nextPage);
		self.changePage(nextPage);
		self.nav.select(nextIndex);

		return false;
	}

	this.arrowBack = function(e){
		if(self.back.disabled) return false;

		var nextIndex = self.currentPage.index - 1;
		var nextPage = self.pages[nextIndex];

		var title = self.titles[nextIndex];
		var update = function(){
			title.style.marginLeft = title.x + "px";
			title.style.opacity = title.alpha;
		}

		if(title.tween) title.tween.stop();
		title.tween = new Tween(title, 300, {x: 25, alpha: 0, ease: Ease.easeOut.sine, onUpdate: update});

		self.updateHistory(nextPage);
		self.changePage(nextPage);
		self.nav.select(nextIndex);

		return false;
	}

	this.__construct__();
}

var RallyPage = function(div){
	var self = this;

	this.back;
	this.next;
	this.index;
	this.div = div;
	this.props = {x: 0, alpha: 1, alphaContent: 1, contentX: 0};

	this.__construct__ = function(){
		var divs = this.div.getElementsByTagName("div");

		for(var i=0; i<divs.length; i++){
			var div = divs[i];
			if(/content/.test(div.className)){
				this.content = div;
			} else if(/intro/.test(div.className)){
				this.intro = div;
			}
		}

		this.intro.style.opacity = "0";
		this.content.style.opacity = "0";
	}

	this.slideOut = function(x){
		var props = {
			x: x,
			alpha: 0,
			ease: Ease.easeOut.quint,
			onUpdate: function(){
				self.intro.style.marginLeft = self.props.x + "px";
				self.intro.style.opacity = self.props.alpha;
				self.content.style.opacity = self.props.alpha;
			},
			onComplete: function(){
				self.div.style.marginLeft = "-9999px";
				self.intro.style.marginLeft = "0";
			}
		}

		if(this.tween) this.tween.stop();
		if(this.contentTween) this.contentTween.stop();
		this.tween = new Tween(this.props, 600, props);
	}

	this.slideIn = function(x){
		if(this.tween) this.tween.stop();
		var d = (x > 0) ? 1 : -1;

		this.props.alpha = 0;
		this.props.alphaContent = 0;
		this.props.contentX = 50 * d;
		this.props.x = x;

		this.div.style.marginLeft = "0";
		this.intro.style.marginLeft = self.props.x + "px";
		this.tween = new Tween(this.props, 600, {x: 0, alpha: 1, ease: Ease.easeOut.quint, onUpdate: function(){
			self.intro.style.marginLeft = self.props.x + "px";
			self.intro.style.opacity = self.props.alpha;
		}});

		this.content.style.opacity = 0;
		this.content.style.marginLeft = "-50px";
		this.contentTween = new Tween(this.props, 600, {alphaContent: 1, contentX: 0, delay: 400, ease: Ease.easeOut.sine, onUpdate: function(){
			self.content.style.opacity = self.props.alphaContent;
			self.content.style.marginLeft = self.props.contentX + "px";
		}});
	}

	this.__construct__();
}





var SpriteLink = function(spriteData, link){
	var self = this;
	this.link = link;
	this.sprite;

	this.__construct__ = function(){
		this.sprite = new TraditionalSprite(spriteData, this.link);
		this.link.onmouseover = this.mouseOver;
		this.link.onmouseout = this.mouseOut;
	}

	this.mouseOver = function(e){
		self.sprite.stop();
		self.sprite.play(0, 2);
		return false;
	}

	this.mouseOut = function(e){
		self.sprite.stop();
		self.sprite.play(0, null, 1);
		return false;
	}

	this.__construct__();
}
