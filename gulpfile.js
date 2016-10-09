"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var server = require("browser-sync").create();
var del = require("del");

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function(){
  // TODO: remove svg from here once we understand the
  // lecture about sprites.
  return gulp.src("img/**/*.{png,jpg,gif,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("symbols", function(){
  return gulp.src("img/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task('symbols-watch', ['symbols'], function (done) {
    server.reload();
    done();
});

gulp.task("html", function(){
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
});

gulp.task('html-watch', ['html'], function (done) {
    server.reload();
    done();
});

gulp.task("fonts", function(){
  return gulp.src("fonts/**/*.{woff,woff2}")
    .pipe(gulp.dest("build/fonts"));
});

gulp.task("js", function(){
  return gulp.src("js/**/*.js")
    .pipe(gulp.dest("build/js"));
});

gulp.task('js-watch', ['js'], function (done) {
    server.reload();
    done();
});

gulp.task("build", [
  "style",
  "images",
  "symbols",
  "html",
  "fonts",
  "js"
]);

gulp.task("clean", function(){
  return del("build");
});

gulp.task("serve", function() {
  server.init({
    server: "./build",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html", ["html-watch"]);
  gulp.watch("js/**/*.js", ["js-watch"]);
  gulp.watch("img/*.svg", ["symbols-watch"]);

});
