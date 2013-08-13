describe("router.navigateBackToRoute", function() {
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

	beforeEach(function() {
		sessionStorage.clear();
		this.historyStub = sinon.stub(Backbone.History.prototype, 'navigate');

		// Tests depend upon pushState event
		Backbone.history.start({ pushState: true, root: '/' });
	});

	afterEach(function() {
		this.historyStub.restore();
		Backbone.history.stop();
	});

	it("should navigate to a specified backRoute", function() {
		router.navigate('one', true);
		router.navigateBackToRoute();

		Backbone.History.prototype.navigate.calledWith('target1');
	});

});