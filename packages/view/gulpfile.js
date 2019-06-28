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
      replace(/(http:\/\/localhost:5000|https:\/\/open-weather-data-api.herokuapp.com)/g, () => {
        if (env === 'dev') {
          return 'http://localhost:5000'
        } else {
          return 'https://open-weather-data-api.herokuapp.com'
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