const bump = require('gulp-bump');

exports['v.patch'] = () => {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
};

exports['v.minor'] = () => {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump({
      type: 'minor'
    }))
    .pipe(gulp.dest('./'));
};

exports['v.major'] = () => {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump({
      type: 'major'
    }))
    .pipe(gulp.dest('./'));
};
