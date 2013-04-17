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
			options : {
				globals : {
					jQuery : true
				}
			},
			uses_defaults : ['<%=pkg.name%>.js']
		},
		watch : {
			files : ['<%=pkg.name%>.js', packageFile],
			tasks : ['uglify:dist', 'jshint']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['uglify', 'jshint']);
};