var ClassScreenTool = function() {
	this.getNowWidth = function() {

		var winWidth = 0;

		if (window.innerWidth) {
			winWidth = window.innerWidth;
		} else if ((document.body) && (document.body.clientWidth)) {
			winWidth = document.body.clientWidth;
		}



		if (document.documentElement && document.documentElement.clientWidth) {
			winWidth = document.documentElement.clientWidth;
		}
		return winWidth;
	}
	this.getNowHeight = function() {

		var winHeight = 0;

		if (window.innerHeight) {
			winHeight = window.innerHeight;
		} else if ((document.body) && (document.body.clientHeight)) {
			winHeight = document.body.clientHeight;
		}

		if (document.documentElement && document.documentElement.clientHeight) {
			winHeight = document.documentElement.clientHeight;
		}
		return winHeight;
	}
}