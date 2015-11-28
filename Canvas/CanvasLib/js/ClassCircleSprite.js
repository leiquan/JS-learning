var ClassCircleSprite = function(X, Y, width, height) {

	//继承基本sprite
	this.temp = ClassSprites;
	this.temp(X, Y, width, height);
	delete this.temp;


	var self = this;



	this.draw = function(context, canvas) { //画图函数这里必须指定形参


		context.fillStyle = "green";
		context.fillRect(self.X, self.Y, self.width, self.height);

		context.save(); //保存以便恢复
		context.beginPath();
		context.fillRect(10, 10, 20, 20);

		context.clip();
		
		
		//context.restore();
		
		var dataUrl=canvas.toDataURL();
		
		console.log(dataUrl);
		
		var img=new Image();
		img.src=dataUrl;
		
		
		context.drawImage(img,300,300,20,20);


	}

	this.toString = function() {
		return "Object:ClassCircleSprite";
	}

}