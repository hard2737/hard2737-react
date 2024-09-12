const gulp = require('gulp')
const clean = require('gulp-clean')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const exec = require('child_process').exec
const eslint = require('gulp-eslint')

// Define paths
const paths = {
  src: 'src/**/*.js', // Source files
  dist: 'dist/' // Output directory
}

// Clean the dist folder
gulp.task('clean', function () {
  return gulp.src(paths.dist, { allowEmpty: true, read: false }).pipe(clean())
})

// Transpile JavaScript files with Babel
gulp.task('build', function () {
  return gulp
    .src(paths.src)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/preset-env'] // Use babel preset for ES6+
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist))
})

// Publish to npm
gulp.task('publish', function (cb) {
  exec('npm publish', function (err, stdout, stderr) {
    console.log(stdout)
    console.error(stderr)
    cb(err)
  })
})

// Lint task
gulp.task('lint', () => {
  return gulp
    .src(['src/**/*.js']) // Define the files to lint
    .pipe(eslint()) // Run eslint on the files
    .pipe(eslint.format()) // Format the lint results in the terminal
    .pipe(eslint.failAfterError()) // Fail the task if there are errors
})

// Lint task duplicate
gulp.task('build-eslint-rules', () => {
  return gulp
    .src(['src/**/*.js']) // Define the files to lint
    .pipe(eslint()) // Run eslint on the files
    .pipe(eslint.format()) // Format the lint results in the terminal
    .pipe(eslint.failAfterError()) // Fail the task if there are errors
})

// Define the default task that cleans, builds, and then publishes
gulp.task(
  'default',
  gulp.series('build-eslint-rules', 'clean', 'lint', 'build', 'publish')
)
