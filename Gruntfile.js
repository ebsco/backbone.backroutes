module.exports = function(grunt) {
	grunt.initConfig({

		jasmine: {
			unit: {
				src: ['backbone.backroutes.js'],
				options: {
					vendor: ['./libs/underscore/underscore-min.js','./libs/backbone/backbone-min.js'],
					specs: ['./specs/*_spec.js'],
					keepRunner: true,
					outfile: 'specs.html'
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib');
};