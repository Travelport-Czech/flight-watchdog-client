const gulp = require('gulp');
const alias = require('path-alias-resolver/gulp');

gulp.task('default', () => {
  return gulp.src([
    './../../.dist-emails/**/*d.ts'
  ])
    .pipe(alias('.', {
      '@emails': './../../emails/src',
      '@shared': './../../shared/src'
    }))
    .pipe(gulp.dest('./../../.dist-emails'));
});
