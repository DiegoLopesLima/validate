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
					banner : '/* jQuery <%=pkg.name%> <%=pkg.version%> | http://plugins.jquery.com/<%=pkg.name%>/<%=pkg.version%> */\n;'
				}
			}
		},
		jshint : {
			dist : {
				src : ['<%=pkg.name%>.js'],
				options : {
					camelcase : true,
					immed : true,
					indent : true,
					latedef : true,
					newcap : true,
					noarg : true,
					noempty : true,
					quotmark : 'single',
					undef : true,
					unused : true,
					strict : true,
					trailing : true,
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