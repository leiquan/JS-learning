//这是一个舞台的类，所有的sprite都要画到这里
var ClassStage = function(canvas) {

	var self = this;

	var spritesQueue = []; //需要渲染的sprites队列

	this.context = canvas.getContext('2d');

	//默认配置
	this.fps = 0.5; //帧速率
	this.width = "800px"; //画布宽度
	this.height = "600px"; //画布高度
	this.background = "red"; //目前给个背景色

	//手动配置
	this.config = function(fps, width, height, background) {
		this.fps = fps; //帧速率
		this.width = width; //画布宽度
		this.height = height; //画布高度
		this.background = height; //目前给个背景色
	}



	this.addSprite = function(sprite) {

		spritesQueue.push(sprite);

	}

	this.removeSprite = function() {

	}



	this.render = function() { //spritesQueue
		for (var i = 0; i < spritesQueue.length; i++) {
			spritesQueue[i].draw(self.context,canvas);

		}

	}

	this.start = function() { //根据帧速率开始渲染
		//应用设置
		canvas.style.width = this.width;
		canvas.style.height = this.height;
		canvas.style.background = this.background;

		canvas.addEventListener("click", function(e) {
			alert(e.layerX);
		}, false);

		//播放动画
		setInterval(function() {
			self.render();
		}, 1000 / this.fps);
	}








}