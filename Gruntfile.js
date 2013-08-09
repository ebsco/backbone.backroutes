var path = require('path');
module.exports = function(grunt) {
	grunt.initConfig({

		karma: {
			unit: {
				configFile: 'karma.conf.js',
				browsers: ['PhantomJS'],
				autoWatch: true
			}
		},

		express: {
			server: {
				options: {
					bases: '.',
					server: path.resolve('./express'),
					port: 8001
				}
			}
		},

		clean: {
			files: [
				'specs/coverage',
				'specs/junit'
			]
		}

	});

	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('server', ['express:server','express-keepalive']);
	grunt.registerTask('test', ['clean','karma']);
};