//ClassCircleSprite
var ClassCircleSprite = function(X,Y,width,height) {

	//继承
	this.temp = ClassSprites;
	this.temp(X,Y,width,height);
	delete this.temp;
	
	//重写
	this.draw=function(){
		
	}



}