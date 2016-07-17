'use strict'

var watchify = require('watchify')
var browserify = require('browserify')
var gulp = require('gulp')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var gutil = require('gulp-util')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var assign = require('lodash/assign')

var customOpts = {
  entries: ['./src/silk.js'],
  debug: true
}
var opts = assign({}, watchify.args, customOpts)
var b = watchify(browserify(opts))

b.transform('babelify')
b.transform('brfs')
b.on('update', bundle)
b.on('log', gutil.log)

gulp.task('default', bundle)

function bundle () {
  return b.bundle()
    .on('error', gutil.log)
    .pipe(source('silk.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
}
