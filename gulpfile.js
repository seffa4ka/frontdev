var gulp       = require('gulp');
var forever    = require('forever-monitor');
var browser    = require('browser-sync');

var devServer = new (forever.Monitor)('index.js');

gulp.task('default', ['server', 'browser'], watch);
gulp.task('server', server);
gulp.task('restart', restart);
gulp.task('browser', loadBrowser);
gulp.task('test', hello);

////////////////////////////////////////////////////////////

function hello(callback) {
  console.log('Hello!');
  callback();
}

function server() {
  return devServer.start();
}

function restart() {
  return devServer.restart();
}

function loadBrowser(callback) {
  browser({
    proxy: {
      target: "localhost:3030",
    },
    notify: false,
    open: false,
    ui: false,
    port: 8000
  });
  callback();
}

function watch() {
  gulp.watch('src/*.html', browser.reload);
  gulp.watch('src/css/**/*.css', browser.reload);
  gulp.watch('src/js/**/*.js', browser.reload);
}
