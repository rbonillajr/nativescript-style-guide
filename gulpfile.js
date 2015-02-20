var gulp = require( "gulp" );
	sass = require( "gulp-sass" ),
	watch = require( "gulp-watch" );

gulp.task( "default", function() {
	gulp.watch( "./scss/*.scss", [ "sass" ] );
});

gulp.task( "sass", function () {
	gulp.src( "./scss/*.scss" )
		.pipe( sass() )
		.pipe( gulp.dest( "./css" ) );
});
