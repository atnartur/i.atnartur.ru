const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');

require('./gulp/server');
require('./gulp/watch');
require('./gulp/less');
require('./gulp/template');
require('./gulp/images');
require('./gulp/scripts');
require('./gulp/fonts');

gulp.task('default', gulpSequence('template', ['scripts', 'less-prod', 'images', 'fonts']));
