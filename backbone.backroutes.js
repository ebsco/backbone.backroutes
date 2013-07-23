/*
 * Depends upon backbone.routefilter
 * https://github.com/boazsender/backbone.routefilter
 *
 * Depends upon sessionStorage
 * If you need to support IE7 or below, implement a polyfill:
 * https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills#web-storage-localstorage-and-sessionstorage
 * https://gist.github.com/remy/350433
 */

(function(_, Backbone) {

_.extend(Backbone.Router.prototype, {

	// Store route meta per route for recalling with back links
	before: function(params, route) {
		var routeInfo = this.current(),
				previousRoute = sessionStorage.getItem('currentRoute');

		// Don't set if same. (page refresh)
		if (routeInfo.fragment !== JSON.parse(previousRoute).fragment) {
			sessionStorage.setItem('previousRoute', previousRoute);
		}

		sessionStorage.setItem('currentRoute', JSON.stringify(routeInfo));
		sessionStorage.setItem(routeInfo.route, JSON.stringify(routeInfo));
	},

	// pulled from: http://stackoverflow.com/questions/7563949/backbone-js-get-current-route
	current: function() {
		var Router = this,
				fragment = Backbone.history.fragment,
				routes = _.pairs(Router.routes),
				route = null, params = null, matched;

		matched = _.find(routes, function(handler) {
			route = _.isRegExp(handler[0]) ? handler[0] : Router._routeToRegExp(handler[0]);
			return route.test(fragment);
		});

		if (matched) {
			params = Router._extractParameters(route, fragment);
			route = matched[1];
		}

		return {
			route: route,
			fragment: fragment,
			params: params
		};
	},

	navigateWithLastParams: function(route) {
		var targetFragment, targetRoute, targetInfo, previousRoute;

		previousRoute = sessionStorage.getItem('previousRoute');
		targetRoute = this.backRoutes[route] || this.backRoutes['default'];

		if (_.isFunction(targetRoute)) {
			targetRoute = targetRoute(previousRoute ? JSON.parse(previousRoute) : null);
		}

		targetInfo = sessionStorage.getItem(targetRoute);
		targetFragment = JSON.parse(targetInfo).fragment || this.backRoutes['default'];

		this.navigate(targetFragment, true);
	},

	backRoutes: {
		'default': ''
	}

});

})(typeof _ === 'undefined' ? null : _, typeof Backbone === 'undefined' ? null : Backbone);
