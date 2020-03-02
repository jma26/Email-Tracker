var gulp = require('gulp');
    uglify = require('gulp-uglify');
    sass = require('gulp-sass');
    browserSync = require('browser-sync').create();
    dotenv = require('gulp-dotenv'); 
    concat = require('gulp-concat');
    babel = require('gulp-babel');
    
// Compile scss into css and auto inject into browsers
gulp.task('scss', function() {
  return gulp.src('frontend/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('frontend/dist'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('server', function() {
  return gulp.src('frontend/js/*.js')
    .pipe(concat('script.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('frontend/dist'))
    .pipe(browserSync.reload({ stream: true }))
})

// gulp.task('dotenv', function() {
//   return gulp.src('.env.json')
//     .pipe(dotenv())
//     .pipe(gulp.dest('frontend/dist'))
// })

gulp.task('dev', gulp.series('scss', function() {
  browserSync.init({
    server: {
      baseDir: 'frontend',
      index: 'index.html'
    }
  });
  gulp.watch('frontend/*.html').on('change', browserSync.reload);
  gulp.watch('frontend/styles/*.scss', gulp.series('scss'));
  gulp.watch('frontend/js/*.js', gulp.series('server'));
}));

gulp.task('default', gulp.parallel('dev', 'server'));