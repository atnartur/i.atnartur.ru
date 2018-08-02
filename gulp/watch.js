const gulp = require('gulp');
const livereload = require('gulp-livereload');
const lessBuilder = require('./less');
const gulpSequence = require('gulp-sequence');

gulp.task('watch', ['server'], function() {
    livereload.listen();
    const cb = () => livereload.reload();

    gulp.watch('./index.html', cb);
    lessBuilder.watch(cb);
    gulp.watch([
        './templates/**',
        './data/**'
    ], () => gulpSequence('template')(cb));

    gulp.watch(['./js/**'], () => gulpSequence('scripts')(cb));
    cb();
});
