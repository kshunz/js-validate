var runTests = require('gulp-mocha');
var chai = require('chai');
var sinon = require('sinon');

gulp.task('test', function() {
  global.expect = chai.expect;
  global.sinon = sinon;
  global.RULES = require(process.cwd() + '/src/defaults/rules');

  return gulp.src([
    '!./tests/**/*_xtests.js',
    './tests/**/*_tests.js'])
  .pipe(runTests());

});

gulp.task('test-watch', function() {
  return gulp.watch([
    '!./tests/**/*_xtests.js',
    './tests/**/*_tests.js'], ['test']);
});
