global.gulp = require('gulp');
global.gutil = require('gulp-util');
global.log = global.gutil.log;
global.c = global.gutil.colors;

var taskListing = require('gulp-task-listing');
var fs = require('fs');
var files = fs.readdirSync('./tasks');

files.forEach(function (file) {
    var isJs = (file.split('.js').length > 1);

    if(file !== 'plugins' && isJs) {
        require('./tasks' + '/' + file);
    }
});

gulp.task('help', taskListing);

gulp.task('default', ['help']);
