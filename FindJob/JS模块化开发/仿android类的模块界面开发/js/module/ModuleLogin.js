var ModuleLogin=function(username,password,successCallback,failCallback){
	//这里得到密码并且验证是否正确
	if(username=="leiquan"&&password=="930102"){
		//设定cookied以及其他操作
		successCallback();
	}else{
		failCallback();
	}
}
