var   gulp = require( 'gulp' )
    , composer = require( 'gulp-composer' )
    ;

module.exports = function ( done ) {
    composer();

    done();
}
