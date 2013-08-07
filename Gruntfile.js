module.exports = function(grunt) {
	grunt.initConfig({

		karma: {
			unit: {
				configFile: 'karma.conf.js',
				browsers: ['PhantomJS'],
				autoWatch: true
			}
		},

		connect: {
			server: {
				options: {
					keepalive: true,
					port: 8001
				}
			},
			test: {
				default_options: {}
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
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('server', ['connect:server']);
	grunt.registerTask('test', ['clean','karma']);
};