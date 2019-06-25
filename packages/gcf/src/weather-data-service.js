import * as mongodbCrud from './mongo-db-crud'

const weatherDataService = {}
weatherDataService.upsertCityWeather = async multiCityWeather => {
  for (let cityWeatherInfo of multiCityWeather) {
    try {
      await mongodbCrud.replaceOne('CityWeather',
        { _id: cityWeatherInfo['_id'] },
        cityWeatherInfo, {
          upsert: true
        })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

weatherDataService.upsertAreaWeather = async multiAreaWeather => {
  for (let areaWeatherInfo of multiAreaWeather) {
    try {
      await mongodbCrud.replaceOne('AreaWeather',
        { _id: areaWeatherInfo['_id'] },
        areaWeatherInfo, {
          upsert: true
        })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default weatherDataService