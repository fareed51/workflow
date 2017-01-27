var gulp = require('gulp'),
      browserify = require('gulp-browserify'),
      webserver = require('gulp-webserver'),
      htmlmin = require('gulp-htmlmin'),
      compass = require('gulp-compass'),
      gutil = require('gulp-util'),
      sassSources = ['development/sass/style.scss'],
      sassStyle = 'compressed',
      jsSources = ['development/scripts/script.js'];

gulp.task('html', function() {
  return gulp.src('development/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('production'));
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'development/sass',
      css: 'production/sass',
      style: sassStyle,
      require: ['susy', 'breakpoint']
    })
    .on('error', gutil.log))
});

gulp.task('react', function() {
  return gulp.src('development/react/react.js' )
    .pipe(browserify({
      transform: 'reactify',
      debug: true
    }))
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest('production/react'));
});

gulp.task('js', function() {
  gulp.src(jsSources)
   return gulp.src('development/js/script.js' )
    .pipe(browserify())
    .on('error', gutil.log)
    .pipe(gulp.dest('production/js'));
});

gulp.task('images', function() {
  gulp.src('development/images/**/*.*')
    .pipe(gulp.dest('production/images'))
});

gulp.task('bootstrap', function() {
  gulp.src('development/bootstrap/**/*.*')
    .pipe(gulp.dest('production/bootstrap'))
});

gulp.task('jQuery', function() {
  gulp.src('development/jQuery/**/*.*')
    .pipe(gulp.dest('production/jQuery'))
});

gulp.task('json', function() {
  gulp.src('development/json/**/*.*')
    .pipe(gulp.dest('production/json'))
});

gulp.task('watch', function() {
  gulp.watch(['development/**/*.html'], ['html']);
  gulp.watch('development/sass/**/*.scss', ['compass']);
  gulp.watch('development/react/**/*.js', ['react']);
  gulp.watch('development/js/**/*.js', ['js']);
});

gulp.task('webserver', function() {
  gulp.src( 'production/')
    .pipe(webserver({
        port: 9000,
        livereload: true,
        open: true
    }));
});

gulp.task('default', ['watch', 'html', 'compass', 'react', 'js', 'images', 'bootstrap', 'jQuery', 'json', 'webserver']);