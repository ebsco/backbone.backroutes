(function($, _, Backbone) {

	this.Router = Backbone.Router.extend({

		routes: {
			'test': 'test',
			'*path': 'index'
		},

		backRoutes: {},

		test: function() {
		},

		index: function() {
		}

	});

	this.app = {
		router: new Router()
	};

	// Tests depend upon pushState event
	Backbone.history.start({ pushState: true, root: '/' });

})(jQuery, _, Backbone);