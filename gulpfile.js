const { task, src, dest, parallel, series } = require("gulp");
const fs = require("fs");
const ts = require("gulp-typescript");
const sm = require("gulp-sourcemaps");

const package_dir = "package";
const ts_project = ts.createProject("tsconfig.json");
const out_dir = ts_project.config.compilerOptions.outDir;
const attached = ["LICENSE", "README.md"];

function mkdir(name, cb) {
  fs.access(name, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdir(name, cb);
    } else {
      cb();
    }
  });
}

function mkdirOutDir(cb) {
  mkdir(out_dir, cb);
}

function cleanDir(name, cb) {
  fs.rm(name, { recursive: true }, cb);
}

function cleanOutDir(cb) {
  cleanDir(out_dir, cb);
}

function compile() {
  return ts_project
    .src()
    .pipe(sm.init())
    .pipe(ts_project())
    .pipe(sm.write("."))
    .pipe(dest(out_dir));
}

function copyConfig() {
  return src("package.json").pipe(dest(out_dir));
}

task("build", series(mkdirOutDir, cleanOutDir, compile, copyConfig));

function mkdirPackage(cb) {
  mkdir(package_dir, cb);
}

function cleanPackage(cb) {
  cleanDir(package_dir, cb);
}

function dumpLibrary() {
  return src(`${out_dir}/**/*`).pipe(dest(package_dir));
}

function fillPackage() {
  return src(attached).pipe(dest(package_dir));
}

task(
  "pack",
  series(
    mkdirPackage,
    cleanPackage,
    parallel(series(task("build"), dumpLibrary), fillPackage)
  )
);
