module.exports = function(grunt) {

	'use strict';

	var

		packageFile = 'package.json',

		data = grunt.file.readJSON(packageFile),

		uglifyFiles = {};

	uglifyFiles[data.name + '.min.js'] = data.name + '.js';

	grunt.config.init({
		uglify : {
			dist : {
				files : uglifyFiles,
				options : {
					banner : '/*! jQuery Validate ' + data.version + ' | http://plugins.jquery.com/' + data.name + '/' + data.version + ' */\n;'
				}
			}
		},
		jshint : {
			dist : {
				src : [data.name + '.js'],
				options : {
					jshintrc : '.jshintrc'
				}
			}
		},
		qunit : {
			dist : {
				options : {
					timeout : 999999,
					urls : [data.name + '.test.html']
				}
			}
		},
		watch : {
			dist : {
				files : [data.name + '.js', packageFile],
				tasks : ['uglify:dist', 'jshint:dist', 'qunit:dist']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.loadNpmTasks('grunt-contrib-qunit');

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['uglify:dist', 'jshint:dist', 'qunit:dist']);

};