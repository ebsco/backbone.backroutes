describe('Dependencies for backbone.backroutes', function() {

	it('should have jQuery', function() {
		expect($).toBeDefined('jQuery is required');
	});

	it('should have Underscore', function() {
		expect(_).toBeDefined('Underscore is required');
	});

	it('should have Backbone', function() {
		expect(Backbone).toBeDefined('Backbone is required');
	});

});