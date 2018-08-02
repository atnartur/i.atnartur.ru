const gulp = require('gulp');
const connect = require('gulp-connect');

gulp.task('server', () => connect.server({
    name: 'i.atnartur.ru dev server',
    root: ['./'],
    port: 8888
}));