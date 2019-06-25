const gulp = require('gulp')
const clean = require('gulp-clean')
const babel = require('gulp-babel')
const fs = require('fs').promises

const babelGcfJs = sourceJS => {
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

const rename = async () => {
  await fs.rename('./dist/package.json.gcf', './dist/package.json')
}

gulp.task('clean', cleanFiles.bind(cleanFiles, './dist'))

gulp.task('copyFiles', () => {
  return gulp
    .src(['./.env', './package.json.gcf'])
    .pipe(gulp.dest('./dist'))
})

/* babel */
gulp.task('babelGcfJs', babelGcfJs.bind(babelGcfJs, './src/**/*.js'))

/* 經 babel 轉譯，打包至 GCF 可使用之格式 */
gulp.task('packageToGcf',
  gulp.series('clean', 'copyFiles', 'babelGcfJs', rename)
)