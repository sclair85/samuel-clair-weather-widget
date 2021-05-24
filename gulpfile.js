const {src, dest, parallel, series, watch, prefix} = require('gulp');

function htmlTask() {
  return src('src/*.html')
  .pipe(dest('dist'))
}

function stylesTask() {
  return src('src/*.css')
  .pipe(dest('dist/css'))
}

function scriptsTask() {
  return src('src/app.js')
  .pipe(dest('dist/js'))
}

exports.htmlTask = htmlTask;
exports.stylesTask = stylesTask;
exports.scriptsTask = scriptsTask;
exports.default = parallel(htmlTask, stylesTask, scriptsTask);
