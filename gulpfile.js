var gulp = require('gulp');
var chai = require('chai');
var mocha = require('gulp-mocha');

gulp.task('test', function() {
  global.expect = chai.expect;
  
  return gulp.src('tests/**/*.js')
    .pipe(mocha());
});

gulp.task('default', []);
