//自定义一个纯对象模块
define({
	show: function(windowIndexId) {

		var windowIndex = document.getElementById(windowIndexId);
		windowIndex.style.width = 100 + "px";
		windowIndex.style.height = 60 + "px";
		windowIndex.style.backgroundColor = "red";
	}
});