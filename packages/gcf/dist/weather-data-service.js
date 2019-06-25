"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoDbCrud = require("./mongo-db-crud");

var mongodbCrud = _interopRequireWildcard(_mongoDbCrud);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const weatherDataService = {};

weatherDataService.upsertCityWeather = async multiCityWeather => {
  for (let cityWeatherInfo of multiCityWeather) {
    try {
      await mongodbCrud.replaceOne('CityWeather', {
        _id: cityWeatherInfo['_id']
      }, cityWeatherInfo, {
        upsert: true
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

weatherDataService.upsertAreaWeather = async multiAreaWeather => {
  for (let areaWeatherInfo of multiAreaWeather) {
    try {
      await mongodbCrud.replaceOne('AreaWeather', {
        _id: areaWeatherInfo['_id']
      }, areaWeatherInfo, {
        upsert: true
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

exports.default = weatherDataService;