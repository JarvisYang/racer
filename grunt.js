grunt.loadNpmTasks('grunt-livereload');

{
	livereload:{
		files:["./**/*"]
	},
	watch: {
		somecss: {
			files: '**/*.css',
			tasks: ['copy:somecss']
		},
		js: {
			files: '**/*.js',
			tasks: ['concat']
		}
	}
};
