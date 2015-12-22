//配置注意：
//<script src="js/require.js" data-main = "js/app.js"></script>
//data-main和src同级,同样的需要指明路径，但是可以不指明后缀,这在整个requireJS中实用。以防混淆，习惯在这里指定。
require.config({
	baseUrl: 'js/app' //定义根目录
});


require(['person'],
	function(person) {

		alert(person.name);

	});

require(['personSay'], function(personSay) {

	personSay.say();

});

require(['shirt'], function(shirt) {
	alert(shirt.color + ":" + shirt.size);
});


require(['dp'], function(dp) {
	alert("这里是包含依赖项的模块");
	alert(dp.size);
});