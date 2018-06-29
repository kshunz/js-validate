global.gulp = require('gulp');
const walk = require('walk-sync');
const registry = {};
const pathParse = require('path-parse');
const taskFiles = walk('./tasks').filter(function(taskPath) {
  return pathParse(taskPath).ext === '.js';
});

const tasks = {};
taskFiles.forEach(function(taskPath) {
  let task = require([
    './tasks',
    pathParse(taskPath).dir,
    pathParse(taskPath).name
  ].join('/'));

  Object.assign(tasks, task);
});

Object.keys(tasks).forEach(task => {
  gulp.task(task, tasks[task])
});
