module.exports = function(grunt) {
	grunt.initConfig({

		connect: {
			server: {
				default_options: {}
			}
		},

		jasmine: {
			unit: {
				src: ['backbone.backroutes.js'],
				options: {
					helpers: ['./example/scripts/app.js'],
					vendor: [
						'./libs/jQuery/jquery.min.js',
						'./libs/underscore/underscore-min.js',
						'./libs/backbone/backbone-min.js'
					],
					host: 'http://localhost:8000/',
					specs: ['./specs/*.spec.js'],
					keepRunner: true,
					outfile: 'specs.html',
					template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
              coverage: 'specs/coverage/coverage.json',
              report: 'specs/coverage',
              thresholds: {
                  lines: 75,
                  statements: 75,
                  branches: 75,
                  functions: 90
              }
          }
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('test', ['connect','jasmine']);
};