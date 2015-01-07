var expect = require('chai').expect,
	express = require('./expressStub'),
	multipleViews = require('../index');

// Stub for source tree
var tree = {
	'./views': {
		'one': true,
		'two': true
	},
	'./module1/views': {
		'three': true
	},
	'./module2/views': {
		'four': true
	}
};

// Express stub
var app = express(tree);

describe('multiple views', function() {
	it('allows single path', function() {
		app.set('views', './views');

		var View = app.get('view');
		var views = app.get('views');

		// test out view
		var view = new View('myview', {root: views});

		// lookup views
		expect(view.lookup('one')).to.be.true();
		expect(view.lookup('two')).to.be.true();
		expect(view.lookup('three')).to.be.undefined();
		expect(view.lookup('four')).to.be.undefined();
	});

	it('allows two different paths', function() {
		multipleViews(app, './module1/views');

		var View = app.get('view');
		var views = app.get('views');

		// test out view
		var view = new View('myview', {root: views});

		// lookup views
		expect(view.lookup('one')).to.be.true();
		expect(view.lookup('two')).to.be.true();
		expect(view.lookup('three')).to.be.true();
		expect(view.lookup('four')).to.be.null();
	});

	it('allows three different paths', function() {
		multipleViews(app, './module2/views');

		var View = app.get('view');
		var views = app.get('views');

		// test out view
		var view = new View('myview', {root: views});

		// lookup views
		expect(view.lookup('one')).to.be.true();
		expect(view.lookup('two')).to.be.true();
		expect(view.lookup('three')).to.be.true();
		expect(view.lookup('four')).to.be.true();
	});
});