describe("router.current", function() {

	var Router = Backbone.Router.extend({

		routes: {
			'test': 'test',
			'*path': 'index'
		},

		backRoutes: {},

		test: function(params) {
		},

		index: function() {
		}

	});
	var router = new Router();

	beforeEach(function() {

		// Tests depend upon pushState event
		Backbone.history.start({ pushState: true, root: '/' });

		router.navigate('test?foo=bar', true);
	});

	afterEach(function() {
		Backbone.history.stop();
	});

	it("should return info on the current route", function() {
		var currentSpy, routeInfo;
		currentSpy = sinon.spy(router, 'current');

		routeInfo = router.current();

		expect(currentSpy).called;
		expect(routeInfo.route).to.equal('test');
		expect(routeInfo.fragment).to.equal('test?foo=bar');
		expect(routeInfo.params[0].foo).to.equal('bar');
	});

});