Events = {
	registry: {},

	dispatch: function(obj, e){
		var uid = obj.uid;
		this.register(uid, e.name);
		var actions = this.registry[uid][e.name];
		for(var i = 0; i < actions.length; i++){
			actions[i](e);
		}
	},

	addListener: function(obj, name, listener){
		if(!listener) return;
		var uid = obj.uid;
		this.register(uid, name);
		this.registry[uid][name].push(listener);
	},

	removeListener: function(obj, name, func){
		var actions = this.registry[obj.uid][name];
		for(var i = 0; i < actions.length; i++)
			if(func == actions[i]) actions.splice(i, 1);
	},

	register: function(uid, name){
		if(!this.registry[uid]) this.registry[uid] = {};
		if(!this.registry[uid][name]) this.registry[uid][name] = [];
	},

	destroy: function(obj, name){
		this.registry[obj.uid][name] = false;
	},

	showRegistry: function(obj, name){
		console.log(this.registry);
	}
}
