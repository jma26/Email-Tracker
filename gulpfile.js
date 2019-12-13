var gulp = require('gulp');
    uglify = require('gulp-uglify');
    sass = require('gulp-sass');
    sass.compiler = require('node-sass');
    connect = require('gulp-connect');

gulp.task('server', function() {
  connect.server({
    root: 'build',
    port: 8000,
    livereload: true,
  })
})

gulp.task('html', function(done) {
  gulp.src('frontend/index.html')
      .pipe(gulp.dest('build'))
      .on('end', function() {
        done();
      })
      .pipe(connect.reload());
})

gulp.task('js', function(done) {
  gulp.src('frontend/*.js')
      .pipe(uglify().on('error', function(error) {
        // Handle any js errors
        done(error);
      }))
      .pipe(gulp.dest('build'))
      .on('end', function() {
        done();
      })
      .pipe(connect.reload());
});

gulp.task('scss', function(done) {
  gulp.src('frontend/*.scss')
      .pipe(sass.sync().on('error', function(error) {
        done(error);
      }))
      .pipe(gulp.dest('build'))
      .on('end', function() {
        done();
      })
      .pipe(connect.reload());
});

gulp.task('default', gulp.series('html', 'js', 'scss', 'server'), function(done) {
  gulp.watch(['frontend/*.html'], ['html']);
  gulp.watch(['frontend/*.scss'], ['scss']);
  gulp.watch(['frontend/*.js'], ['js']);
  done();
});

function done(error) {
  if (error) {
    console.log('Build error:', error);
  } else {
    console.log('Build successful');
  }
}