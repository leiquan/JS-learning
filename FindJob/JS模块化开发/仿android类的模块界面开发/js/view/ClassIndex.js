var ClassIndex = function(indexId, menuId, searchId) {


	var index = document.getElementById(indexId);
	var menu = document.getElementById(menuId);
	var search = document.getElementById(searchId);
	
	index.style.display="none";

	this.show = function() {

		index.style.display = "block";
	}

	this.hide = function() {

		index.style.display = "none";

	}

	this.menuClick = function(handle) {


		menu.addEventListener("click", function() {
			handle();
		}, false);

	}

	this.searchClick = function(handle) {


		search.addEventListener("click", function() {
			handle();
		}, false);

	}





}