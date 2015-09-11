onmessage =function (evt){
	
	
	
  var d = evt.data;//通过evt.data获得发送来的数据
  postMessage(d+"这是回复的消息");//将获取到的数据发送会主线程
  
  
  
  
  
  
  
  
  
}