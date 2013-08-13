/*
 * Depends upon sessionStorage
 * If you need to support IE7 or below, implement a polyfill:
 * https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills#web-storage-localstorage-and-sessionstorage
 * https://gist.github.com/remy/350433
 */

(function(_, Backbone) {

var storeRouteInfo = function(routeInfo) {
	var previousRoute = sessionStorage.getItem('currentRoute');

	// Don't set if same. (page refresh)
	if (previousRoute && routeInfo.fragment !== JSON.parse(previousRoute).fragment) {
		sessionStorage.setItem('previousRoute', previousRoute);
	}

	sessionStorage.setItem('currentRoute', JSON.stringify(routeInfo));
	sessionStorage.setItem(routeInfo.route, JSON.stringify(routeInfo));
};

_.extend(Backbone.Router.prototype, {

	navigate: function(fragment, options) {
		Backbone.history.navigate(fragment, options);
		var routeInfo = this.current();
		if (options !== true || !options.trigger) {
			storeRouteInfo(routeInfo);
		} else {
			sessionStorage.setItem(routeInfo.route, JSON.stringify(routeInfo));
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

	navigateBackToRoute: function(options, defaultFragment) {

		var currentRoute, targetRoute, targetFragment, targetInfo, previousRoute;

		currentRoute = this.current().route,
		targetRoute = this.backRoutes[currentRoute] || this.backRoutes['default'];

		if (_.isFunction(targetRoute)) {
			previousRoute = sessionStorage.getItem('previousRoute');
			targetRoute = targetRoute(previousRoute ? JSON.parse(previousRoute) : null);
		}

		if (targetRoute === false) {
			history.back();
			return;
		}

		targetInfo = sessionStorage.getItem(targetRoute);
		targetFragment = targetInfo ? JSON.parse(targetInfo).fragment : (defaultFragment || '');

		Backbone.history.navigate(targetFragment, options);
	},

	backRoutes: {
		'default': ''
	}

});

})(typeof _ === 'undefined' ? null : _, typeof Backbone === 'undefined' ? null : Backbone);

