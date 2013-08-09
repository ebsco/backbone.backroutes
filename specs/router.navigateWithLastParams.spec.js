describe("router.navigateWithLastParams", function() {
	var Router = Backbone.Router.extend({

		routes: {
			'one': 'one',
			'two': 'two',
			'target1': 'target1',
			'target2': 'target2'
		},

		backRoutes: {
			'one': 'target1',
			'two': 'target2'
		},

		one: function(params) {
		},

		two: function(params) {
		},

		target1: function(params) {
		},

		target2: function(params) {
		}

	});
	var router = new Router();

	it("should navigate to a specified backRoute", function() {
		expect(Backbone.Router.prototype.navigateWithLastParams).to.be.a('function');
	});

});