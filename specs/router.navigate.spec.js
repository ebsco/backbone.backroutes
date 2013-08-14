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
		this.historySpy = sinon.spy(Backbone.History.prototype, 'navigate');

		// Tests depend upon pushState event
		Backbone.history.start({ pushState: true, fragment: true, root: '/' });

		router.navigate('test?foo=bar', true);
	});

	afterEach(function() {
		this.historySpy.restore();
		Backbone.history.stop();
	});


	it("should pass-through correctly to history.navigate", function() {
		expect(router.test).to.be.defined;
		expect(Backbone.history.navigate.calledWithExactly('test?foo=bar', true)).to.be.true;
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