(function($, _, Backbone) {

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

		one: function(params) {
		},

		two: function(params) {
		},

		three: function(params) {
		},

		four: function(params) {
		}

	});
	var router = new Router();

	// Tests depend upon pushState event
	Backbone.history.start({ pushState: true, fragment: true, root: '/' });
	$(document).on("click", "a[href]:not([data-bypass])", function(evt) {
		var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
		var root = location.protocol + "//" + location.host + '/example';

		if (href.prop.slice(0, root.length) === root) {
			evt.preventDefault();
			if ($(this).is('.back')) {
				router.navigateWithLastParams(router.current().route, { trigger: true }, href.attr);
			} else {
				router.navigate(href.attr, true);
			}
		}
	});

	var app = _.extend({}, Backbone.Events);
	var View = Backbone.View.extend({

		el: "#main",

		template: _.template("<pre><code class='json'><%= code %></code></pre>"),

		render: function() {
			$(this.el).html(this.template({
				code: hljs.highlight('json', JSON.stringify(this.model, null, '  ')).value
			}));
		}

	});
	app.listenTo(router, 'route', function(route) {
		new View({ model: router.current() }).render();
	});

})(jQuery, _, Backbone);