const runTests = require('gulp-mocha');
const chai = require('chai');
const sinon = require('sinon');

exports.test = function test() {
  global.expect = chai.expect;
  global.sinon = sinon;
  global.RULES = require(process.cwd() + '/src/defaults/rules');

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
  ], ['test']);
};
