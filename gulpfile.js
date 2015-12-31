var browserify = require('gulp-browserify');
var chai = require('chai');
var gulp = require('gulp');
var minify = require('gulp-uglify');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');
var bump = require('gulp-bump');

gulp.task('package', function() {
  return gulp.src('./src/validate.js')
    .pipe(browserify())
    .pipe(rename('js-validate.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('package-min', ['package'], function() {
  return gulp.src('./dist/js-validate.js')
    .pipe(minify({}))
    .pipe(rename('js-validate.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('test', function() {
  global.expect = chai.expect;
  global.RULES = require('./src/defaults/rules');

  return gulp.src(['!./tests/**/*_xtest*', './tests/**/*_test*.js'])
    .pipe(mocha());
});

gulp.task('test-watch', function() {
  gulp.watch([
    '!./tests/**/*_xtest*',
    './tests/**/*_test*.js',
    './src/**/*.js'
  ], ['test']);
});

gulp.task('patch', function() {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));

});

gulp.task('minor', function() {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump({ type: 'minor' }))
    .pipe(gulp.dest('./'));
});

gulp.task('major', function() {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump({ type: 'major' }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['test', 'package-min']);
