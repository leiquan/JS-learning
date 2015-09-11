//定义一个存在依赖的模块
define(['person', 'personSay', 'shirt'], function(person, personSay, shirt) {

	return {
		name: person.name,
		sex: personSay.say,
		size: shirt.size
	}

});