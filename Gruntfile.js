module.exports = function(grunt) {

	'use strict';

	var

		packageFile = 'package.json';

	grunt.initConfig({
		pkg : grunt.file.readJSON(packageFile),
		uglify : {
			dist : {
				files : {
					'<%=pkg.name%>.min.js': '<%=pkg.name%>.js'
				},
				options : {
					banner : '/* jQuery Validate <%=pkg.version%> | http://plugins.jquery.com/validate/<%=pkg.version%> */\n;'
				}
			}
		},
		jshint : {
			dist : {
				src : ['<%=pkg.name%>.js'],
				options : {
					globals : {
						jQuery : true
					}
				}
			}
		},
		watch : {
			files : ['<%=pkg.name%>.js', packageFile],
			tasks : ['uglify:dist', 'jshint:dist']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['uglify', 'jshint']);
};