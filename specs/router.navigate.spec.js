describe("router.navigate", function() {

	var Router = Backbone.Router.extend({

		routes: {
			'test': 'test'
		},

		test: function(params) {
		}

	});
	var router = new Router();

	beforeEach(function() {
		sessionStorage.clear();
		this.historyStub = sinon.stub(Backbone.History.prototype, 'navigate', function(fragment, options) {
			router.test();
		});

		// Tests depend upon pushState event
		Backbone.history.start({ pushState: true, root: '/' });

		router.navigate('test?foo=bar', true);
	});

	afterEach(function() {
		this.historyStub.restore();
		Backbone.history.stop();
	});


	it("should pass-through correctly to history.navigate", function() {
		expect(router.test).to.be.defined;
		Backbone.history.navigate.calledWith('test?foo=bar', true);
	});

	it("should store route information whenever navigate is called", function() {
		var routeInfo = sessionStorage.getItem('test');
		expect(routeInfo).to.be.a('string');

		routeInfo = JSON.parse(routeInfo);
		expect(routeInfo).to.be.an('object');

		expect(routeInfo.route).to.equal('test');
		expect(routeInfo.fragment).to.equal('test?foo=bar');
		expect(routeInfo.params).to.be.an('array');
		expect(routeInfo.params[0]).to.be.an('object');
		expect(routeInfo.params[0].foo).to.equal('bar');
	});

});