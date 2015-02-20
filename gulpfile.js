var gulp = require( "gulp" ),
	concat = require( "gulp-concat" ),
	sass = require( "gulp-sass" ),
	watch = require( "gulp-watch" );

gulp.task( "default", function() {
	gulp.watch( "./scss/*.scss", [ "sass" ] );
	gulp.watch( "./scripts/*.js", [ "scripts" ] );
});

gulp.task( "sass", function () {
	gulp.src( "./scss/*.scss" )
		.pipe( sass() )
		.pipe( gulp.dest( "./css" ) );
});

gulp.task( "scripts", function() {
	gulp.src([ "scripts/jquery.js", "scripts/prism.js", "scripts/app.js" ])
		.pipe( concat( "built.js" ) )
		.pipe( gulp.dest( "./scripts/" ) );
});
