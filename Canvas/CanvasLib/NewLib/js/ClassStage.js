//ClassStage
var ClassStage=function(div){
	
	var self=this;
	var spriteQueue=[];
	
	//初始化
	this.init=function(fps,width,height){
		self.fps=fps;
		self.width=width;
		self.height=height;
		div.style.width=width+"px";
		div.style.height=height+"px";
		div.style.position="relative";
		div.style.border="2px solid red"
	}
	
	//添加一个组件
	this.addSprite=function(sprite){
		
	}
	
	//删除一个组件
	this.removeSprite=function(sprite){
		
	}
	
	//渲染全部sprites
	this.render=function(){
		
	}
	
	//返回类型
	this.toString=function(){
		return "Object:Div:ClassStage";
	}
	
	
}
