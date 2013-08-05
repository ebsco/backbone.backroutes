module.exports = function(grunt) {
	grunt.initConfig({

		karma: {
			unit: {
				configFile: 'karma.conf.js',
				autoWatch: true
			}
		}

		// connect: {
		// 	server: {
		// 		options: {
		// 			keepalive: true,
		// 			port: 8001
		// 		}
		// 	},
		// 	test: {
		// 		default_options: {}
		// 	}
		// },

		// jasmine: {
		// 	unit: {
		// 		src: ['backbone.backroutes.js'],
		// 		options: {
		// 			helpers: ['./example/scripts/app.js'],
		// 			vendor: [
		// 				'./libs/jQuery/jquery.min.js',
		// 				'./libs/underscore/underscore-min.js',
		// 				'./libs/backbone/backbone-min.js',
		// 				'./libs/backbone-query-parameters/backbone.queryparams.js'
		// 			],
		// 			host: 'http://localhost:8000/',
		// 			specs: ['./specs/*.spec.js'],
		// 			keepRunner: true,
		// 			outfile: 'specs.html',
		// 			template: require('grunt-template-jasmine-istanbul'),
		// 			templateOptions: {
		// 					coverage: 'specs/coverage/coverage.json',
		// 					report: 'specs/coverage',
		// 					thresholds: {
		// 							lines: 50,
		// 							statements: 50,
		// 							branches: 10,
		// 							functions: 80
		// 					}
		// 			}
		// 		}
		// 	}
		// }

		// mocha: {
		// 	all: {
		// 		options: {
		// 			run: true,
		// 			urls: ['http://localhost:8000/specs/index.html']
		// 		}
		// 	}
		// }

	});

	grunt.loadNpmTasks('grunt-karma');
	// grunt.loadNpmTasks('grunt-contrib-connect');
	// grunt.loadNpmTasks('grunt-contrib-jasmine');
	// grunt.loadNpmTasks('grunt-mocha');

	grunt.registerTask('test', ['connect:test','mocha']);
};