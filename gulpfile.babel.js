'use strict';

var gulp    = require('gulp'),
    nodemon = require('gulp-nodemon'),
    mocha   = require('gulp-mocha-co'),
    watch   = require('gulp-watch'),
    livereload  = require('gulp-livereload'),
    // browserSync = require('browser-sync');
    browserSync = require('browser-sync').create();

//-----------running mongod-------------//
var exec = require('child_process').exec;
function runCommand(command) {
  return function (cb) {
    exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  }
}
gulp.task('start-mongo', runCommand("mongod --dbpath d:/data/db/"));
// gulp.task('stop-mongo', runCommand('mongo --eval \"use admin; db.shutdownServer();\"'));
// gulp.task('start-app', runCommand('node app.js'));
//-----------running mongod-------------//

gulp.task('nodemon', function () {
    nodemon({
        script: 'server.js',
        env: { 'NODE_ENV': 'development' }
    }).on('restart');
});

gulp.task('watch', function () {
    gulp.src(['./app/**/*.js'], {read: true})
    .pipe(watch())
    .on('change', browserSync.reload);
    // .pipe(livereload());
});

gulp.task('default', ['test', 'nodemon', 'watch'], function () {
    return gulp.once('end', function () {
        runCommand('mongo --eval \"use admin; db.shutdownServer();\"');
    })
});


//-------------Test Connection--------------//
var webdriver   = require('gulp-webdriver');
    
gulp.task('test', ['start-mongo'], function () {
    gulp.src('./test/specs/connection/*.js')
    .pipe(mocha({
        ignoreLeaks: false,
        reporter: 'nyan'        
    }));
});
//-------------browser-sync--------------//

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "localhost:3001"
    });
});

// gulp.task('browser-sync', function () {
//     browserSync.init({
//         // logLevel: 'silent',
//         // notify: false,
//         // open: false,
//         // port: 9000,
//         // ui: false,
//         server: {
//             baseDir: ['test']
//         }
//     });
// });
//-------------WebdriverIO--------------//
gulp.task('test:wdio', ['browser-sync'], function () {
    return gulp.src('wdio.conf.js')
    .pipe(webdriver())
    .once('end', function () {
        browserSync.exit();
    });
});