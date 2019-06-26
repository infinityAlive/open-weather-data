"use strict";

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _qs = require("qs");

var _qs2 = _interopRequireDefault(_qs);

var _dayjs = require("dayjs");

var _dayjs2 = _interopRequireDefault(_dayjs);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _ajaxUtil = require("./ajax-util");

var _ajaxUtil2 = _interopRequireDefault(_ajaxUtil);

var _weatherDataService = require("./weather-data-service");

var _weatherDataService2 = _interopRequireDefault(_weatherDataService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cwbAuthorization = _config2.default.cwbAuthorization;

const retrieveCityWeather = async () => {
  const queryString = _qs2.default.stringify({
    Authorization: cwbAuthorization,
    format: 'JSON',
    locationName: '臺北市,新北市,桃園市'
  });

  const multiCityWeather = [];

  try {
    let response = await (0, _ajaxUtil2.default)('get', `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?${queryString}`);

    if (!response || !response.body) {
      throw 'response is empty';
    }

    response.body.records.location.forEach(locationInfo => {
      const city = locationInfo.locationName;
      const wx = locationInfo.weatherElement[0].time; // 天氣現象

      const pop = locationInfo.weatherElement[1].time; // 降雨機率

      const minT = locationInfo.weatherElement[2].time;
      const maxT = locationInfo.weatherElement[4].time;
      const cityWeatherInfo = {};
      cityWeatherInfo['_id'] = city;
      cityWeatherInfo['updateTime'] = new Date((0, _dayjs2.default)().toISOString());
      cityWeatherInfo['timeRange'] = [];

      for (let i = 0; i < wx.length; i++) {
        const wxInfo = wx[i];
        cityWeatherInfo.timeRange.push({
          startTime: wxInfo.startTime,
          endTime: wxInfo.endTime,
          desc: wxInfo.parameter.parameterName,
          rainProbability: pop[i].parameter.parameterName,
          minTemperature: minT[i].parameter.parameterName,
          maxTemperature: maxT[i].parameter.parameterName
        });
      }

      multiCityWeather.push(cityWeatherInfo);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }

  return multiCityWeather;
};

const retrieveAreaWeather = async () => {
  const queryString = _qs2.default.stringify({
    Authorization: cwbAuthorization,
    format: 'JSON',
    elementName: 'TEMP,HUMD',
    parameterName: 'CITY'
  });

  const multiAreaWeather = [];

  try {
    let response = await (0, _ajaxUtil2.default)('get', `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?${queryString}`);

    if (!response || !response.body) {
      throw 'response is empty';
    }

    response.body.records.location.filter(locationInfo => {
      const city = locationInfo.parameter[0].parameterValue;
      return city === '臺北市' || city === '新北市' || city === '桃園市';
    }).forEach(locationInfo => {
      const area = locationInfo.locationName;
      const weatherElement = locationInfo.weatherElement; // 天氣現象

      const areaWeatherInfo = {};
      areaWeatherInfo['_id'] = area;
      areaWeatherInfo['updateTime'] = new Date((0, _dayjs2.default)().toISOString());
      areaWeatherInfo['city'] = locationInfo.parameter[0].parameterValue;

      for (let weatherElementInfo of weatherElement) {
        areaWeatherInfo[weatherElementInfo.elementName] = weatherElementInfo.elementValue;
      }

      multiAreaWeather.push(areaWeatherInfo);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }

  return multiAreaWeather;
};

exports.updatingWeather = (request, response) => {
  let corsFn = (0, _cors2.default)();
  corsFn(request, response, async () => {
    if (request.method === 'GET') {
      const multiCityWeather = await retrieveCityWeather();
      const multiAreaWeather = await retrieveAreaWeather();
      await _weatherDataService2.default.upsertCityWeather(multiCityWeather);
      await _weatherDataService2.default.upsertAreaWeather(multiAreaWeather);
      response.status(200).send(`Update weather data successfully`);
    } else {
      response.status(400).end();
    }
  });
};