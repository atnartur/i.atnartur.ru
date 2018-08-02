const gulp = require('gulp');

gulp.task('fonts-copy', () => gulp.src('fonts/**').pipe(gulp.dest('dist/fonts')));

gulp.task('fonts', ['fonts-copy']);