describe('Dependencies for backbone.backroutes', function() {

	it('should have jQuery', function() {
		expect($).to.be.ok;
	});

	it('should have Underscore', function() {
		expect(_).to.be.ok;
	});

	it('should have Backbone', function() {
		expect(Backbone).to.be.ok;
	});

});