module.exports = function(grunt) {

	'use strict';

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify: {
			dist: {
				files: {
					'<%=pkg.name%>.min.js': '<%=pkg.name%>.js'
				},
				options: {
					banner: '/* jQuery Validate <%=pkg.version%> | http://plugins.jquery.com/validate/<%=pkg.version%> */\n;'
				}
			}
		},
		watch: {
			files: ['<%=pkg.name%>.js'],
			tasks: ['uglify:dist']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['uglify']);
};