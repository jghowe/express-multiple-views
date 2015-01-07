(function() {

	var app = {
		get: function(name) {
			return this[name];
		},
		set: function(name, value) {
			this[name] = value;
		}
	};

	// Stub for express view logic
	var View = function(name, options) {
		this.name = name;
		this.root = options.root;
	};

	View.prototype = {
		lookup: function(viewName) {
			return app.tree[this.root][viewName];
		}
	};

	app.set('view', View);

	module.exports = function(tree) {
		app.tree = tree;
		return app;
	};
})();