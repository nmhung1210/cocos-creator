const gulp = require("gulp");
const clean = require("gulp-clean");
const ts = require('gulp-typescript');
const zip = require('gulp-zip');
const watch = require('gulp-watch');

const tsProject = ts.createProject("./tsconfig.json", {
  declaration: false
});

const DEST_PATH = "dist/mgobexs.zip";
const SRC_PATH = "./src/mgobexs";

const TSC_PATH = ["./src/mgobexs/*.ts"];

gulp.task("clean", () => {
  return gulp.src("./" + DEST_PATH, {
    read: false,
    allowEmpty: true
  }).pipe(clean({
    force: true
  }));
});

gulp.task("tsc", () => {
  return gulp.src(TSC_PATH)
    .pipe(tsProject()).js
    .pipe(gulp.dest(SRC_PATH));
});

gulp.task("zip", () => {
  return gulp.src([
      './src/**/*.*',
      '!./src/mgobexs/*.ts',
      '!./**/__MACOSX',
      '!./**/.DS_Store'
    ]).pipe(zip(DEST_PATH))
    .pipe(gulp.dest("./"));
});

gulp.task("default", gulp.series("clean", "tsc", "zip"));

gulp.task("watch", () => {
  return watch('./src/mgobexs/*.ts', gulp.series("default"));
});