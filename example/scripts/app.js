(function($, _, Backbone) {

	// Setup a basic app to render the current route info
	var RouteView = Backbone.View.extend({
		el: "#main",
		template: _.template("<pre><code class='json'><%= code %></code></pre>"),

		serialize: function() {
			var json = JSON.stringify(this.model, null, '  ');
			return {
				code: hljs.highlight('json', json).value
			};
		},

		render: function() {
			$(this.el).html(this.template(this.serialize()));
		},

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		}
	});

	var Router = Backbone.Router.extend({
		routes: {
			'example/one(/)': 'one',
			'example/two(/)': 'two',
			'example/three(/)': 'three',
			'example/four(/)': 'four'
		},

		backRoutes: {
			'one': 'four',
			'two': 'three',
			'three': 'two',
			'four': 'one'
		},

		one: $.noop,
		two: $.noop,
		three: $.noop,
		four: $.noop,

		initialize: function() {
			var routeModel = new Backbone.Model();
			var routeView = new RouteView({ model: routeModel });
			this.on('route', function(route) {
				routeModel.set(this.current());
			});
		}
	});
	var router = new Router();

	// Tests depend upon pushState event
	Backbone.history.start({ pushState: true, fragment: true });

	// Capture the navigation links
	$(document).on("click", "a[href]:not([data-bypass])", function(evt) {
		var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
		var root = location.protocol + "//" + location.host + '/example';

		if (href.prop.slice(0, root.length) === root) {
			evt.preventDefault();
			if ($(this).is('.back')) {
				router.navigateBackToRoute({ trigger: true }, href.attr);
			} else {
				router.navigate(href.attr, true);
			}
		}
	});

})(jQuery, _, Backbone);