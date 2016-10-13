var gulp = require( 'gulp' )
    , runSequence = require( 'run-sequence' )
    ;

module.exports = function( done ) {
    return runSequence(
        'clean',
        [ 'copy', 'imagemin' ],
        [ 'sass', 'browserify' ],
        done
    );
}
