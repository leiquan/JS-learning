var ClassReg = function(regId) {

	var reg = document.getElementById(regId);
	
	reg.style.display="none";

	this.show = function() {
		reg.style.display="block";
	}
	
	this.hide = function() {
		reg.style.display="none";
	}

}