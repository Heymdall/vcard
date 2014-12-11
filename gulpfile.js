var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  jasmine = require('gulp-jasmine');


gulp.task('build', function () {
  return gulp.src('src/vcard.js')
    .pipe(uglify())
    .pipe(rename('vcard.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('test', function () {
  return gulp.src('test/vcard.spec.js')
    .pipe(jasmine());
});

gulp.task('default', ['test', 'build']);
