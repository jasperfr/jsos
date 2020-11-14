var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ts = require("gulp-typescript");
const browserSync = require('browser-sync');
var tsProject = ts.createProject("tsconfig.json");
var browsersync = require('browser-sync').create();

function reload(done) {
  browsersync.reload();
  done();
}

function images() {
  return gulp
    .src('src/**/*.png')
    .pipe(gulp.dest('./dist'));
}

function css() {
  return gulp
    .src('src/**/*.scss')
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist'));
}

function scripts() {
  return gulp
    .src(['src/**/*.ts','src/*.ts'])
    .pipe(tsProject())
    .js
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist'));
};

function build(done) {
  gulp.task(gulp.series(css, ts, images));
  done();
}

function watch() {
  browsersync.init({
    server: {
      baseDir: './dist'
    },
    port: 3000
  });
  gulp.watch('./src/**/*.scss', gulp.series(css, reload));
  gulp.watch(['src/**/*.ts','src/*.ts'], gulp.series(scripts, reload));
  gulp.watch('./src/**/*.png', gulp.series(images, reload));
}

gulp.task('default', gulp.series(build, watch));
