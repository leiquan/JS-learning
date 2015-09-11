window.onload = function() {
	
	var windowIndex = new ClassIndex("index","menu","search");
	var windowLogin=new ClassLogin("login","btnLogin");
	
	var windowReg=new ClassReg("reg","btnReg");
	
	windowIndex.show();
	
	windowIndex.menuClick(function(){
		
		windowIndex.hide();
		windowLogin.show();
		
		windowLogin.btnLoginClick(
			function(){
				var moduleLogin=new ModuleLogin("leiquan","930102",function(){
					alert("登陆成功");
				},function(){
					alert("登陆失败");
				});
			}
		);
		
	});
	
	windowIndex.searchClick(function(){
		alert("这里是search handle");
	});
}