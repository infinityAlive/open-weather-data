const gulp = require('gulp')
const clean = require('gulp-clean')
const babel = require('gulp-babel')

const babelJs = sourceJS => {
  return gulp
    .src(sourceJS, {
      base: './src'
    })
    .pipe(babel())
    .pipe(gulp.dest('./dist'))
}

const cleanFiles = source => {
  return gulp
    .src(source, {
      read: false,
      allowEmpty: true
    })
    .pipe(clean())
}

gulp.task('clean', cleanFiles.bind(cleanFiles, './dist'))

/* babel */
gulp.task('babelJs', )

gulp.task('babelJs', gulp.series('clean', babelJs.bind(babelJs, './src/**/*.js')))
