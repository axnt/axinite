var autoprefixer = require('autoprefixer');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build', shell.task(['npm run build']));

gulp.task('clean', function() {
  return del(['css/**/*']);
});

gulp.task('min', function() {
 return gulp.src('scss/axinite.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(rename('axinite.min.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('css'));
});

gulp.task('prefix', function() {
  return gulp.src('css/*.css')
  .pipe(sourcemaps.init())
  .pipe(postcss([autoprefixer({browsers:['last 2 versions']})]))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('css'));
});

gulp.task('sass', function() {
  return gulp.src('scss/axinite.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch('scss/axinite.scss', ['sass']);
});

gulp.task('default', ['build']);