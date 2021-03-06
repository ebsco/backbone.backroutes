// Karma configuration
// Generated on Mon Aug 05 2013 12:11:36 GMT-0400 (EDT)

module.exports = function(config) {
	config.set({

		// base path, that will be used to resolve files and exclude
		basePath: '',

		// frameworks to use
		frameworks: ['mocha'],

		// list of files / patterns to load in the browser
		files: [
			'libs/sinonjs/sinon.js',
			'libs/chai/chai.js',
			'specs/mocha.config.js',
			'libs/jQuery/jquery.min.js',
			'libs/underscore/underscore-min.js',
			'libs/backbone/backbone-min.js',
			'libs/backbone-query-parameters/backbone.queryparams.js',
			'backbone.backroutes.js',
			'specs/*.spec.js'
		],

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['dots','coverage','junit'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		junitReporter: {
			outputFile: 'specs/junit/test-results.xml'
		},

		preprocessors: {
			// source files, that you wanna generate coverage for
			// do not include tests or libraries
			// (these files will be instrumented by Istanbul)
			'backbone.backroutes.js': ['coverage']
		},

		// optionally, configure the reporter
		coverageReporter: {
			type: 'html',
			dir: 'specs/coverage/'
		},

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['Chrome'],

		background: false,

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false
	});
};
