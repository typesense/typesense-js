'use strict'

import gulp from 'gulp'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import sourcemaps from 'gulp-sourcemaps'
import uglify from 'gulp-uglify'
import del from 'del'

gulp.task('build', function () {
  return browserify({
    entries: './src/Client.js',
    debug: true
  }).transform('babelify', {presets: ['env']})
    .bundle()
    .pipe(source('Typesense.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/js/'))
})

gulp.task('clean', function () {
  return del([
    'dist/**'
  ])
})
