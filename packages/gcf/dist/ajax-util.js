"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _superagent = require("superagent");

var _superagent2 = _interopRequireDefault(_superagent);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _https = require("https");

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_https2.default.globalAgent.maxSockets = 10;
_http2.default.globalAgent.maxSockets = 10;

const ajax = (httpMethod, url, type, headers, payload) => {
  let ajax = (0, _superagent2.default)(httpMethod, url).timeout(30 * 1000);
  if (type) ajax.type(type);

  if (headers) {
    ajax.set(headers);
  }

  if (payload) {
    ajax.send(payload);
  }

  return ajax;
};

exports.default = ajax;