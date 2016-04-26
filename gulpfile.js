var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jasmine = require('gulp-jasmine'),
    bump = require('gulp-bump'),
    git = require('gulp-git'),
    filter = require('gulp-filter'),
    tagVersion = require('gulp-tag-version');


gulp.task('build', function () {
    return gulp.src('src/vcard.js')
        .pipe(uglify())
        .pipe(rename('vcard.min.js'))
        .pipe(gulp.dest('dist'));
});

function versionBump(type) {
    return gulp
        .src(['packaje.json', 'bower.json'])
        .pipe(bump({type: type}))
        .pipe(gulp.dest('./'))
        .pipe(git.commit('bumps package version'))
        .pipe(filter('package.json'))
        .pipe(tagVersion());
}

['patch', 'minor', 'major'].forEach(function (type) {
    gulp.task('bump-' + type, function () {
        return versionBump(type);
    });
})

gulp.task('test', function () {
    return gulp.src('test/vcard.*.spec.js')
        .pipe(jasmine());
});

gulp.task('dev', function () {
    gulp.watch(['test/*', 'src/*.js'], ['test']);
});

gulp.task('default', ['test', 'build', 'bump-patch']);
