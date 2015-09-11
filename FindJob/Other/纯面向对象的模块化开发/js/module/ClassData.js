var ClassData=function(){
	var data=20;
	this.add=function(){
		data++;
	}
	this.minus=function(){
		data--;
	}
	this.get=function(){
		return data;
		console.log(data);
	}
}
