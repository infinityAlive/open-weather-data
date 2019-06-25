import cors from 'cors'
import qs from 'qs'
import dayjs from 'dayjs'
import config from './config'
import ajax from './ajax-util'
import weatherDataService from './weather-data-service'

const cwbAuthorization = config.cwbAuthorization
const retrieveCityWeather = async () => {
  const queryString = qs.stringify({
    Authorization: cwbAuthorization,
    format: 'JSON',
    locationName: '臺北市,新北市,桃園市'
  })
  const multiCityWeather = []

  try {
    let response = await ajax('get',
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?${queryString}`)

    if (!response || !response.body) {
      throw 'response is empty'
    }

    response.body.records.location
      .forEach(
        locationInfo => {
          const city = locationInfo.locationName
          const wx = locationInfo.weatherElement[0].time      // 天氣現象
          const pop = locationInfo.weatherElement[1].time     // 降雨機率
          const minT = locationInfo.weatherElement[2].time
          const maxT = locationInfo.weatherElement[4].time

          const cityWeatherInfo = {}
          cityWeatherInfo['_id'] = city
          cityWeatherInfo['updateTime'] = new Date(dayjs().toISOString())
          for (let i = 0; i < wx.length; i++) {
            const wxInfo = wx[i]
            cityWeatherInfo[`time${i + 1}`] = {
              startTime: wxInfo.startTime,
              endTime: wxInfo.endTime,
              desc: wxInfo.parameter.parameterName,
              rainProbability: pop[i].parameter.parameterName,
              minTemperature: minT[i].parameter.parameterName,
              maxTemperature: maxT[i].parameter.parameterName,
            }
          }
          multiCityWeather.push(cityWeatherInfo)
        }
      )
  } catch (error) {
    console.error(error)
    throw error
  }

  return multiCityWeather
}

const retrieveAreaWeather = async () => {
  const queryString = qs.stringify({
    Authorization: cwbAuthorization,
    format: 'JSON',
    elementName: 'TEMP,HUMD',
    parameterName: 'CITY'
  })
  const multiAreaWeather = []

  try {
    let response = await ajax('get',
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?${queryString}`)

    if (!response || !response.body) {
      throw 'response is empty'
    }

    response.body.records.location
      .filter(
        locationInfo => {
          const city = locationInfo.parameter[0].parameterValue
          return city === '臺北市' || city === '新北市' || city === '桃園市'
        }
      )
      .forEach(
        locationInfo => {
          const area = locationInfo.locationName
          const weatherElement = locationInfo.weatherElement     // 天氣現象
          const areaWeatherInfo = {}

          areaWeatherInfo['_id'] = area
          areaWeatherInfo['updateTime'] = new Date(dayjs().toISOString())
          for (let weatherElementInfo of weatherElement) {
            areaWeatherInfo[weatherElementInfo.elementName] = weatherElementInfo.elementValue
          }
          multiAreaWeather.push(areaWeatherInfo)
        }
      )
  } catch (error) {
    console.error(error)
    throw error
  }

  return multiAreaWeather
}

exports.updatingWeather = (request, response) => {
  let corsFn = cors()
  corsFn(request, response, async () => {
    if (request.method === 'GET') {
      const multiCityWeather = await retrieveCityWeather()
      const multiAreaWeather = await retrieveAreaWeather()
      await weatherDataService.upsertCityWeather(multiCityWeather)
      await weatherDataService.upsertAreaWeather(multiAreaWeather)
      response.status(200).send(`Update weather data successfully`)
    } else {
      response.status(400).end()
    }
  })
}