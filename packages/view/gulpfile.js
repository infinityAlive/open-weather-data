const gulp = require('gulp')
const cache = require('gulp-cache')
const imageMin = require('gulp-imagemin')
const replace = require('gulp-replace')
const pngquant = require('imagemin-pngquant')

const minifyImage = sourceImage => {
  return gulp
    .src(sourceImage, { base: './src' })
    .pipe(cache(imageMin({
      use: [pngquant({
        speed: 7
      })]
    })))
    .pipe(gulp.dest('./dist'))
}

const switchEnv = env => {
  return gulp
    .src(['./src/modules/axios-config.js'], {
      base: './'
    })
    .pipe(
      replace(/(localhost:8080|104.199.245.246)/g, () => {
        if (env === 'dev') {
          return 'localhost:8080'
        } else {
          return '104.199.245.246'
        }
      })
    )
    .pipe(gulp.dest('./'))
}

gulp.task('minifyImage', minifyImage.bind(minifyImage, './src/static/img/**/*.@(jpg|png)'))

gulp.task('switchDevEnv', switchEnv.bind(switchEnv, 'dev'))
gulp.task('switchProductionEnv', switchEnv.bind(switchEnv, 'production'))

/* 部署 */
gulp.task('deployToDev',
  gulp.series('minifyImage', 'switchDevEnv')
)

gulp.task('deployToProduction',
  gulp.series('minifyImage', 'switchProductionEnv')
)