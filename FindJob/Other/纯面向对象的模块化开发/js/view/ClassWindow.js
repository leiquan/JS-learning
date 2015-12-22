var ClassWindow = function() {

	//初始化，判断屏幕方向，0横屏，1竖屏
	var screenTool = new ClassScreenTool();
	var width = screenTool.getNowWidth();
	var height = screenTool.getNowHeight();


	this.show = function() {

		console.log(width + ":" + height)

		//根据横竖屏分别渲染
		if (width > height) {

		} else {


		}
	}

}