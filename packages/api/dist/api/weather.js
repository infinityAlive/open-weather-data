"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieveCitiesWeatherInfo = undefined;

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _weatherDataService = require("../service/weather-data-service");

var _weatherDataService2 = _interopRequireDefault(_weatherDataService);

var _messages = require("../common/messages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const retrieveCitiesWeatherInfo = (request, response) => {
  let corsFn = (0, _cors2.default)();
  corsFn(request, response, async () => {
    if (request.method === 'GET') {
      let cties = [];

      if (request.query.hasOwnProperty('city')) {
        cties = request.query.cties;
      } else {
        cties = ['臺北市', '新北市', '桃園市'];
      }

      try {
        const citiesWeatherInfo = await _weatherDataService2.default.retrieveCityWeather(cties);
        response.status(_messages.HttpStatus.OK_200).send(citiesWeatherInfo);
      } catch (error) {
        response.sendStatus(_messages.HttpStatus.SERVER_ERROR_500);
      }
    } else {
      response.sendStatus(_messages.HttpStatus.BAD_REQUEST_400);
    }
  });
};

exports.retrieveCitiesWeatherInfo = retrieveCitiesWeatherInfo;