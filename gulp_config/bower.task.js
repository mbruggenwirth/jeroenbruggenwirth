var bower = require( 'bower' )
    , gutil = require( 'gulp-util' )
    ;

module.exports = function() {
    return bower.commands.install()
        .on( 'log', function( data ) {
            gutil.log( 'bower', gutil.colors.cyan( data.id ), data.message );
        } );
};
