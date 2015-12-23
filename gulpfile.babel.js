'use strict';

var gulp    = require('gulp'),
    nodemon = require('gulp-nodemon'),
    mocha   = require('gulp-mocha-co'),
    watch   = require('gulp-watch'),
    concat = require('gulp-concat'),//haven't used yet
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload  = require('gulp-livereload');
    // browserSync = require('browser-sync');

var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var fs = require("fs");
var assign = require('lodash.assign');

//------------browserify---------------//
var customOpts = {
    entries: 'site/js/main.js', 
    extensions: ['.jsx', '.js'], 
    debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));
b.transform('babelify', {presets: ['es2015', 'react']});

gulp.task('browserify', bundle);
b.on('update', bundle);
b.on('log', gutil.log);
function bundle() {
    return b.bundle()
    //log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('public/js'));    
}

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
    .pipe(watch(['./app/**/*.js']))
    .on('change', browserSync.reload);
    // .pipe(livereload());
});

gulp.task('default', ['test', 'nodemon'], function () {
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