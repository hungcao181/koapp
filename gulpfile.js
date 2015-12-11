'use strict';

var gulp    = require('gulp'),
    nodemon = require('gulp-nodemon'),
    mocha   = require('gulp-mocha-co'),
    watch   = require('gulp-watch'),
    livereload  = require('gulp-livereload'),
    browserSync = require('browser-sync').create();
    
gulp.task('test', function () {
    gulp.src('./test/**/*.js')
    .pipe(mocha({
        ignoreLeaks: false,
        reporter: 'nyan'        
    }));
});

gulp.task('nodemon', function () {
    nodemon({
        script: 'server.js',
        env: { 'NODE_ENV': 'development' }
    }).on('restart');
});

gulp.task('watch', function () {
    gulp.src(['./app/**/*.js'], {read: true})
    .pipe(watch({emit: 'all'}))
    .on('change', browserSync.reload);
    // .pipe(livereload());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "localhost"
    });
});

gulp.task('default', ['test', 'nodemon', 'watch', 'browser-sync']);