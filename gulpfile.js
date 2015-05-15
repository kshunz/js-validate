var browserify = require('gulp-browserify');
var chai = require('chai');
var gulp = require('gulp');
var minify = require('gulp-uglify');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');

gulp.task('package', function() {
  return gulp.src('./src/js-validate.js')
    .pipe(browserify())
    .pipe(gulp.dest('./'));
});
gulp.task('package-min', function() {
  return gulp.src('./js-validate.js')
    .pipe(minify({}))
    .pipe(rename('js-validate.min.js'))
    .pipe(gulp.dest('./'));
});
gulp.task('test', function() {
  global.expect = chai.expect;

  return gulp.src('./tests/**/*.js')
    .pipe(mocha());
});

gulp.task('default', ['test', 'package']);
