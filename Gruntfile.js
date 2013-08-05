module.exports = function(grunt) {
	grunt.initConfig({

		karma: {
			unit: {
				configFile: 'karma.conf.js',
				browsers: ['Chrome'],
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

		mocha: {
			all: {
				options: {
					run: true,
					urls: ['http://localhost:8000/specs/index.html']
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-mocha');

	grunt.registerTask('server', ['connect:server']);
	grunt.registerTask('test', ['connect:test','mocha']);
};