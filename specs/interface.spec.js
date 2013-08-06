// helper: js
describe('Backbone.Router extended with backbone.backroutes', function() {

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

	it('should allow backRoutes to be specified', function() {
		expect(Backbone.Router.prototype.backRoutes).to.be.an('object');
	});

	describe("router.navigate", function() {

		var router;

		beforeEach(function() {
			this.historyStub = sinon.stub(Backbone.History.prototype, 'navigate', function(fragment, options) {
				router.test();
			});
			router = new Router();

			// Tests depend upon pushState event
			Backbone.history.start({ pushState: true, root: '/' });

			router.navigate('test?foo=bar', true);
		});

		afterEach(function() {
			this.historyStub.restore();
			Backbone.history.stop();
		});

		it("should pass-through correctly to history.navigate", function() {
			expect(router.test).to.not.be.undefined;
			Backbone.history.navigate.calledWith('test?foo=bar', true);
		});

		it("should store route information whenever navigate is called");

	});

	describe("router.current", function() {

		var router;

		beforeEach(function() {

			router = new Router();

			// Tests depend upon pushState event
			Backbone.history.start({ pushState: true, root: '/' });

			router.navigate('test?foo=bar', true);
		});

		afterEach(function() {
			Backbone.history.stop();
		});

		it("should have method", function() {
			expect(Backbone.Router.prototype.current).to.be.a('function');
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

	describe("router.navigateWithLastParams", function() {

		it("should have method", function() {
			expect(Backbone.Router.prototype.navigateWithLastParams).to.be.a('function');
		});

		it("should navigate to a specified backRoute", function() {
			expect(Backbone.Router.prototype.navigateWithLastParams).to.be.a('function');
		});

	});

});