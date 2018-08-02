const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const responsive = require('gulp-responsive');
const gulpSequence = require('gulp-sequence');
const loadYaml = require('./template').loadYaml;

gulp.task('images-copy', () => gulp.src('images/**').pipe(gulp.dest('dist/images')));

gulp.task('images-responsive', () => {
    let info = loadYaml('info');

    let photo = [
        {
            width: 200,
            rename: 'photo_top.png',
            format: 'png'
        }, {
            width: 200 * 2,
            rename: 'photo_top@2x.png',
            format: 'png'
        }
    ];

    let convert = icon => photo.push({
        width: icon,
        rename: 'photo_' + icon + '.png',
        format: 'png'
    });

    info.appleIcons.forEach(convert);
    info.icons.forEach(convert);

    gulp.src([
        'images/*',
        '!images/*.svg'
    ])
        .pipe(responsive({
            'clienddev.png': [{height: 35 * 2}],
            'photo.jpeg': photo,
            'smarthead.png': [{height: 41}]
        }))
        .pipe(gulp.dest('dist/images/'))
});

gulp.task('images-compress', () =>
    gulp.src([
        'dist/images/**/**',
        '!dist/images/*.svg'
    ])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

gulp.task('images', gulpSequence('images-copy', 'images-compress', 'images-responsive'));
