var gulp = require('gulp');
    uglify = require('gulp-uglify');
    sass = require('gulp-sass');
    browserSync = require('browser-sync').create();
    nodemon = require('gulp-nodemon');
    env = require('gulp-env');
    
// Compile scss into css and auto inject into browsers
gulp.task('scss', function() {
  return gulp.src('frontend/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('frontend/styles'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('nodemon', function() {
  env({
    file: '.env.json'
  })

  nodemon({
    script: 'frontend/js/server.js',
    ext: 'js'
  })
})

gulp.task('serve', gulp.series('scss', function() {
  browserSync.init({
    server: {
      baseDir: 'frontend',
      index: 'index.html'
    }
  });
  gulp.watch('frontend/*.html').on('change', browserSync.reload);
  gulp.watch('frontend/styles/*.scss', gulp.series('scss'));
}));

gulp.task('default', gulp.parallel('serve', 'nodemon'));