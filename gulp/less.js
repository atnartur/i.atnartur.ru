const gulp = require('gulp');
const rename = require('gulp-rename');
const nano = require('gulp-cssnano');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const uncss = require('postcss-uncss');

gulp.task('less', () =>
    gulp.src('styles/base.less')
        .pipe(less())
        .pipe(nano({
            // фикс сжатия z-index - все значения строятся относительно файла, а не глобально.
            // этот флаг выключает данный вид сжатия.
            // https://github.com/ben-eb/gulp-cssnano/issues/8
            zindex: false
        }))
        .pipe(rename('base.min.css'))
        .pipe(gulp.dest('dist/'))
);

gulp.task('less-prod', ['less'], () =>
    gulp.src('dist/base.min.css')
        .pipe(postcss([
            autoprefixer(),
            uncss({
                ignore: [
                  /collaps/,
                  /in/,
                  /carousel/,
                  '.modal-open',
                  '.modal',
                  '.modal.fade .modal-dialog',
                  '.modal.in .modal-dialog',
                  '.modal-open .modal',
                  '.modal-dialog',
                  '.modal-content',
                  '.modal-backdrop',
                  '.modal-backdrop.fade',
                  '.modal-backdrop.in',
                  '.fade.in',
                ],
                html: ['index.html']
            })
        ]))
        .pipe(gulp.dest('dist/'))
);


module.exports = {
    watch: livereloadCallback => gulp.watch('styles/**', ['less', livereloadCallback])
};
