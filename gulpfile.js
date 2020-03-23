"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var rename = require("gulp-rename");
var csso = require("gulp-csso");


gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});


var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task('js', function () {
  return gulp.src('js/*.js')                 // get the files
    .pipe(browserSync.stream())                 // browsersync stream
});



var gulp = require("gulp");
var webp = require("gulp-webp");
gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest("source/img"));
});

var gulp = require("gulp");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

var gulp = require("gulp");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("js", function () {
  return gulp.src("source/js/*.js")
    .pipe(gulp.dest("build/js"))
    .pipe(sourcemap.write("."))
    .pipe(server.stream())
});


gulp.task("server", function () {
  server.init({
    server: "build/"
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css", "refresh"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/*.js", gulp.parallel("js", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});


gulp.task("build", gulp.series("css", "sprite", "html", "js"));
gulp.task("start", gulp.series("build", "server"));

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.ttf",
    "source/img/**",
    "source/js/**",
    "source/*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

var gulp = require("gulp");
var del = require("del");
gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "webp",
  "sprite",
  "html",
  "js"
));
