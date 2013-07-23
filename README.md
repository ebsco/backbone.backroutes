## Dependencies
This plugin makes use of the [backbone.routefilter plugin](https://github.com/boazsender/backbone.routefilter) written by Boaz Sender.  It also uses sessionStorage and thus, if you need to support IE7 or below, you will need to implement a polyfill.
https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills#web-storage-localstorage-and-sessionstorage
https://gist.github.com/remy/350433

## Description
This Backbone Router plugin answers a specific use case where you need to map a link back to a certain route and trigger it with the last know set of parameters.  It provides the ability to specify a mapping of route handler ids to target fragments and provides a navigateWithParams method.

## Usage
{{
	var router = Backbone.Router.extend({

		backRoutes: {
			"sourceRoute": "target/target"
		},

		routes: {
			"target/target": "targetHandler"
		}

	});

	...

	router.navigateWithParams("targetHandler")
}}