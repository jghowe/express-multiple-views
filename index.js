module.exports = function(app, viewPath) {
	if (!app.get('multiple-view-enabled')) {
		// Monkey-patch express to accept multiple paths for looking up views.
	    var lookup_proxy = app.get('view').prototype.lookup;

	    app.get('view').prototype.lookup = function(viewName) {
	        var context, match;
	        if (this.root instanceof Array) {
	            for (var i = 0; i < this.root.length; i++) {
	                context = {root: this.root[i]};
	                match = lookup_proxy.call(context, viewName);
	                if (match) {
	                    return match;
	                }
	            }
	            return null;
	        }
	        return lookup_proxy.call(this, viewName);
	    };

	    app.set('multiple-view-enabled', true);
    }

    var views = app.get('views');
	if (views instanceof Array) {
		views.push(viewPath);
		app.set('views', views);
	}
	else {
		app.set('views', [views, viewPath]);
	}
}