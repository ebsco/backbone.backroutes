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

var storeRouteInfo = function(routeInfo, storePrevious) {
	var previousRoute = storePrevious ? sessionStorage.getItem('currentRoute') : null;

	// Don't set if same. (page refresh)
	if (previousRoute && routeInfo.fragment !== JSON.parse(previousRoute).fragment) {
		sessionStorage.setItem('previousRoute', previousRoute);
	}

	sessionStorage.setItem('currentRoute', JSON.stringify(routeInfo));
	sessionStorage.setItem(routeInfo.route, JSON.stringify(routeInfo));
};

_.extend(Backbone.Router.prototype, {

	// Store route meta per route for recalling with back links
	before: function() {
		storeRouteInfo(this.current(), true);
	},

	navigate: function(fragment, options) {
		Backbone.history.navigate(fragment, options);

		// if we are just changing the url, we need to handle the storage here
		// otherwise let the route filter handle
		if (options !== true || !options.trigger) {
			storeRouteInfo(this.current());
		}
		return this;
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

	navigateWithLastParams: function(route, options) {
		var targetFragment, targetRoute, targetInfo, previousRoute;

		previousRoute = sessionStorage.getItem('previousRoute');
		targetRoute = this.backRoutes[route] || this.backRoutes['default'];

		if (_.isFunction(targetRoute)) {
			targetRoute = targetRoute(previousRoute ? JSON.parse(previousRoute) : null);
		}

		targetInfo = sessionStorage.getItem(targetRoute);
		targetFragment = JSON.parse(targetInfo).fragment || this.backRoutes['default'];

		Backbone.history.navigate(targetFragment, options);
	},

	backRoutes: {
		'default': ''
	}

});

})(typeof _ === 'undefined' ? null : _, typeof Backbone === 'undefined' ? null : Backbone);

