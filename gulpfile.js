var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jasmine = require('gulp-jasmine'),
    bump = require('gulp-bump');


gulp.task('build', function () {
    return gulp.src('src/vcard.js')
        .pipe(uglify())
        .pipe(rename('vcard.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('bump', function () {
    return gulp
        .src('./*.json')
        .pipe(bump())
        .pipe(gulp.dest('./'))
});

gulp.task('test', function () {
    return gulp.src('test/vcard.*.spec.js')
        .pipe(jasmine());
});

gulp.task('dev', function () {
    gulp.watch(['test/*', 'src/*.js'], ['test']);
});

gulp.task('default', ['test', 'build', 'bump']);
