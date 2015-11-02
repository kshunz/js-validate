var browserify = require('gulp-browserify');
var chai = require('chai');
var gulp = require('gulp');
var minify = require('gulp-uglify');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');

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

  return gulp.src(['!./tests/**/*_xtest*', './tests/**/*_test*.js'])
    .pipe(mocha());
});

gulp.task('default', ['test', 'package-min']);
