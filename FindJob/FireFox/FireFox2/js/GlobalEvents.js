GlobalEvents = {
	registry: {},

	dispatch: function(e){
		this.register(e.name);
		var actions = this.registry[e.name];
		for(var i = 0; i < actions.length; i++) actions[i](e);
	},

	addListener: function(name, listener){
		this.register(name);
		this.registry[name].push(listener);
	},

	removeListener: function(name, listener){
		var actions = this.registry[name];
		if(!actions) return false;

		for(var i = 0; i < actions.length; i++){
			if(listener == actions[i]){
				actions.splice(i, 1);
			}
		}
	},

	register: function(name){
		if(!this.registry[name])
			this.registry[name] = [];
	},

	destroy: function(name){
		this.registry[name] = false;
	}
}
