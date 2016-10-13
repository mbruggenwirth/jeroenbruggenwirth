var gulp = require( 'gulp' )
    , include = require( 'gulp-html-tag-include' )
    , livereload = require( 'gulp-livereload' )
    , paths = require( './paths.config' );

module.exports = function() {
    return gulp.src( paths.src.templates+'index.html' )
        .pipe( include() )
        .pipe( gulp.dest( paths.dist.root ) )
        .pipe( livereload() );
};
