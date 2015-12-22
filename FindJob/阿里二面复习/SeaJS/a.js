define(function(require, exports) {

	// 对外提供 foo 属性
	exports.foo = 'bar';

	// 对外提供 doSomething 方法
	exports.doSomething = function() {
		alert("doso");
	};

});