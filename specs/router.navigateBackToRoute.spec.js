describe("router.navigateBackRoute", function() {
	var Router = Backbone.Router.extend({

		routes: {
			'one': 'one',
			'two': 'two',
			'three': 'three',
			'target1': 'target1',
			'target2': 'target2',
			'returnFalse': 'returnFalse'
		},

		backRoutes: {
			'one': 'target1',
			'two': function(lastRoute) {
				if (!lastRoute || !lastRoute.route) {
					throw new Error('lastRoute not passed');
				}
				return 'target2';
			},
			'returnFalse': function(lastRoute) {
				return false;
			},
			'default': 'one'
		},

		one: $.noop,
		two: $.noop,
		three: $.noop,
		target1: $.noop,
		target2: $.noop

	});
	var router = new Router();

	beforeEach(function() {
		sessionStorage.clear();
		this.historySpy = sinon.spy(Backbone.History.prototype, 'navigate');

		// Tests depend upon pushState event
		Backbone.history.start({ pushState: true, fragment: true, root: '/' });
	});

	afterEach(function() {
		this.historySpy.restore();
		Backbone.history.stop();
	});

	it("should navigate to a specified backRoute", function() {
		router.navigate('target1');
		router.navigate('one');
		router.navigateBackRoute();

		expect(Backbone.History.prototype.navigate.calledWith('target1')).to.be.true;
	});

	it("should navigate to a provided default route when no backRoute specified", function() {
		router.navigate('one');
		router.navigate('target1');
		router.navigateBackRoute();

		expect(Backbone.History.prototype.navigate.calledWith('one')).to.be.true;
	});

	it("should navigate to a backup fragment when route has not been previously navigated", function() {
		router.navigate('target1');
		router.navigateBackRoute(null, 'one');

		expect(Backbone.History.prototype.navigate.calledWith('one')).to.be.true;
	});

	it("should allow a function as a backroute", function() {
		router.navigate('target2');
		router.navigate('two');
		router.navigateBackRoute();

		expect(Backbone.History.prototype.navigate.calledWith('target2')).to.be.true;
	});

	it("should pass the lastRoute as a parameter to a backroute function when there is navigation activity", function() {
		router.navigate('target2');
		router.navigate('two');
		expect(router.navigateBackRoute()).to.not.throw;
	});

	it("should call navigate.back when a backroute function returns false", function() {
		router.navigate('two');
		router.navigate('returnFalse');
		router.navigateBackRoute();

		expect(Backbone.History.prototype.navigate.calledWith('two')).to.be.true;
	});

});