//自定义一个纯对象模块和方法函数
define({
	name: "leiquan",
	sex: "man",
	say: function() {
		alert("My Name is " + this.name + ", and i am a " + this.sex + "!");
	}
});