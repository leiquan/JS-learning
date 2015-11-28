var ClassLogin = function(loginId,btnLoginId) {

	var login = document.getElementById(loginId);
	login.style.display = "none";
	
	var btnLogin = document.getElementById(btnLoginId);

	this.show = function() {

		login.style.display = "block";

	}
	
	
	this.btnLoginClick=function(handle){
		btnLogin.addEventListener("click",function(){
			handle();
		},false);
	}
}