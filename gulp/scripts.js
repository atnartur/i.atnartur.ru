const gulp = require('gulp');

gulp.task('scripts', () => gulp.src([
  'js/**',
  'node_modules/jquery-lazyload/jquery.lazyload.js'
]).pipe(gulp.dest('dist/js')));