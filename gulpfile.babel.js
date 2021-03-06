'use strict'

import gulp from 'gulp'
import babel from 'gulp-babel'
import rename from 'gulp-rename'
// import concat from 'gulp-concat'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import sourcemaps from 'gulp-sourcemaps'
import uglify from 'gulp-uglify'
import del from 'del'
import commonShake from 'common-shakeify'

gulp.task('build:browser', function () {
  let stream = browserify({
    entries: './src/Typesense.js',
    debug: true,
    standalone: 'Typesense'
  }).transform('babelify', {presets: ['@babel/preset-env']})
    .plugin(commonShake)
    .bundle()
    .pipe(source('typesense.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))

  return stream
})

gulp.task('build:node', function () {
  let stream = gulp.src('src/**/*.js')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(babel())
    .pipe(sourcemaps.write('./'))

  if (process.env.NODE_ENV === 'production') {
    stream = stream.pipe(uglify())
  }

  stream = stream.pipe(gulp.dest('./lib'))
  return stream
})

gulp.task('clean', function () {
  return del([
    './lib/**',
    './dist/**'
  ])
})

gulp.task('build-all', gulp.parallel('build:browser', 'build:node'))
gulp.task('build', gulp.series('clean', 'build-all'))
