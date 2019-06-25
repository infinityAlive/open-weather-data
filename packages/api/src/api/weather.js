import cors from 'cors'
import weatherDataService from '../service/weather-data-service'
import { HttpStatus } from '../common/messages'

const retrieveCitiesWeatherInfo = (request, response) => {
  let corsFn = cors()
  corsFn(request, response, async () => {
    if (request.method === 'GET') {
      let cties = []
      if (request.query.hasOwnProperty('city')) {
        cties = request.query.cties
      } else {
        cties = ['臺北市', '新北市', '桃園市']
      }

      try {
        const citiesWeatherInfo = await weatherDataService.retrieveCityWeather(cties)
        response.status(HttpStatus.OK_200).send(citiesWeatherInfo)
      } catch (error) {
        response.sendStatus(HttpStatus.SERVER_ERROR_500)
      }
    } else {
      response.sendStatus(HttpStatus.BAD_REQUEST_400)
    }
  })
}

export { retrieveCitiesWeatherInfo }
