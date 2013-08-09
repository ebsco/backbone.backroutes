describe('Backbone.Router instance extended with backbone.backroutes', function() {

	it('should allow backRoutes to be specified', function() {
		expect(Backbone.Router.prototype.backRoutes).to.be.an('object');
	});

	it("should have method current", function() {
		expect(Backbone.Router.prototype.current).to.be.a('function');
	});

	it("should have method navigate", function() {
		expect(Backbone.Router.prototype.navigate).to.be.a('function');
	});

	it("should have method navigateWithLastParams", function() {
		expect(Backbone.Router.prototype.navigateWithLastParams).to.be.a('function');
	});

});