var browserify = require('gulp-browserify');
var minify = require('gulp-uglify');
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
