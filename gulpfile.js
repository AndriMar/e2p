'use strict';
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var util = require('gulp-util');
 
gulp.task('test', function () {
    return gulp.src(['test/**/*.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', util.log);
});

gulp.task('ci-test', function () {
    gulp.watch(['test/**','index.js'], ['test']);
});