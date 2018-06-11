const runTests = require('gulp-mocha');

exports.test = function test() {
  return gulp.src([
      '!./tests/**/*_xtests.js',
      './tests/**/*_tests.js'
    ])
    .pipe(runTests());

};

exports['test-watch'] = function testWatch() {
  return gulp.watch([
    '!./tests/**/*_xtests.js',
    './tests/**/*_tests.js'
  ], gulp.series(['test']));
};
