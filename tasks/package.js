const browserify = require('gulp-browserify');
const minify = require('gulp-uglify');
const rename = require('gulp-rename');

const packageTask = function pack() {
  return gulp.src('./src/validate.js')
    .pipe(browserify())
    .pipe(rename('js-validate.js'))
    .pipe(gulp.dest('./dist'));
};

const packageMinTask = gulp.series(packageTask, function minPack() {
  return gulp.src('./dist/js-validate.js')
    .pipe(minify({}))
    .pipe(rename('js-validate.min.js'))
    .pipe(gulp.dest('./dist'));
});

exports['package-min'] = packageMinTask;
exports.package = packageTask;
