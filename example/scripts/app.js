(function($, _, Backbone) {

	this.Router = Backbone.Router.extend({

		routes: {
			'test': 'test',
			'*path': 'index'
		},

		backRoutes: {},

		test: function(params) {
		},

		index: function() {
		}

	});

	// Tests depend upon pushState event
	Backbone.history.start({ pushState: true, root: '/' });

})(jQuery, _, Backbone);