var gulp = require('gulp');
var    exec = require('child_process').exec;

gulp.task('init', function (cb) {
  exec('node server/init.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
  exec('node server/server.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
