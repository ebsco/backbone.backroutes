// helper: app.js
describe('Backbone.Router extended with backbone.backroutes', function() {

	var routerInstance = app.router;

	it('should allow backRoutes to be specified', function() {
		expect(routerInstance.backRoutes).toBeDefined();
	});

	describe("routerInstance.navigate", function() {

		it("should pass-through correctly to history.navigate", function() {
			var routeSpy, historySpy;

			routeSpy = spyOn(routerInstance, 'test').andCallThrough();
			historySpy = spyOn(Backbone.history, 'navigate').andCallFake(function() {
				routerInstance.test();
			});
			routerInstance.navigate('test', true);

			expect(routeSpy).toHaveBeenCalled();
			expect(historySpy).toHaveBeenCalledWith('test', true);
		});

		it("should store route information whenever navigate is called", function() {

		});

	});

	describe("routerInstance.current", function() {

		it("should have method", function() {
			expect(Backbone.Router.prototype.current).toBeDefined();
		});

		it("should return info on the current route", function() {
			var currentSpy, routeInfo;
			currentSpy = spyOn(routerInstance, 'current').andCallThrough();

			routerInstance.navigate('/');
			routeInfo = routerInstance.current();

			expect(currentSpy).toHaveBeenCalled();
			expect(routeInfo.route).toBe('index');
			expect(routeInfo.fragment).toBe('');
			expect(routeInfo.params).toBeDefined();
		});

	});

	describe("routerInstance.navigateWithLastParams", function() {

		it("should have method", function() {
			expect(Backbone.Router.prototype.navigateWithLastParams).toBeDefined();
		});

	});

});