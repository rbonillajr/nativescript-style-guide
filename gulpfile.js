var gulp = require( "gulp" ),
	concat = require( "gulp-concat" ),
	fileInclude = require( "gulp-file-include" ),
	marked = require( "marked" ),
	sass = require( "gulp-sass" ),
	watch = require( "gulp-watch" );

gulp.task( "default", [ "build" ], function() {
	gulp.watch( "./src/**/*", [ "build" ]);
});

gulp.task( "build", [ "include", "sass", "scripts" ]);

gulp.task( "include", function() {
	gulp.src( "./src/index.html" )
		.pipe( fileInclude({
			prefix: "@@",
			filters: {
				markdown: marked
			}
		}))
		.pipe( gulp.dest( "./" ) );
});

gulp.task( "sass", function () {
	return gulp.src( "./src/scss/*.scss" )
		.pipe( sass() )
		.pipe( gulp.dest( "./css" ) );
});

gulp.task( "scripts", function() {
	return gulp.src([ "src/scripts/fastclick.js", "src/scripts/jquery.js", "src/scripts/prism.js", "src/scripts/app.js" ])
		.pipe( concat( "built.js" ) )
		.pipe( gulp.dest( "./scripts/" ) );
});
