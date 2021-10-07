'use strict'

import gulp from 'gulp'
import rename from 'gulp-rename'
import tsify from 'tsify'
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
    entries: './src/Typesense.ts',
    debug: true,
    standalone: 'Typesense'
  })
    .plugin(tsify, {
      compilerOptions: {
        noImplicitAny: true,
        target: 'es2015'
      }
    })
    .transform('babelify', { presets: ['@babel/preset-env'], extensions: ['.ts'] })
    .plugin(commonShake)
    .bundle()
    .pipe(source('typesense.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))

  return stream
})

gulp.task('clean', function () {
  return del(['./dist/**'])
})
