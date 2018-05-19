'use strict';
var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    jsmin = require('gulp-jsmin');
const imagemin = require('gulp-imagemin');

var path = {
    src: {
        // CSS в порядке подключения
        сss: [
            './libs/reset.css',
            './libs/bootstrap-grid.min.css',
            './css/main.css',
            './css/adaptive.css'
        ],
        js: [
            './libs/jquery-3.3.1.min.js',
            './libs/nebPay.js',
            './libs/vue.js',
            './libs/vue-material.js',
            './js/common.js'
        ]
    },
    build: {
        css: './css',
        js: './js'
    },
}



gulp.task('css:build', function() {
    gulp.src(path.src.сss)
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(path.build.css))
});

gulp.task('js:build', function() {
    gulp.src(path.src.js)
        .pipe(jsmin())
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest(path.build.js))
});