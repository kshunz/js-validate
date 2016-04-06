var bump = require('gulp-bump');

gulp.task('v.patch', function() {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));

});

gulp.task('v.minor', function() {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump({ type: 'minor' }))
    .pipe(gulp.dest('./'));
});

gulp.task('v.major', function() {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump({ type: 'major' }))
    .pipe(gulp.dest('./'));
});
