// import router from './server'
import * as weatherApi from './api/weather'
import express from 'express'

const router = express.Router()

router.get('/cities', weatherApi.retrieveCitiesWeatherInfo)

export default router