"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _router = require("./router");

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const app = (0, _express2.default)();
const port = 8080;
const server = app.listen(port, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`listening at host(${host}), port(${port})`);
});
const sessionConfig = {
  secret: 'open-weather-data',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 10 * 1000
  }
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy

  sessionConfig.cookie.secure = true; // serve secure cookies
}

app.use((0, _expressSession2.default)(sessionConfig));
app.use((0, _cors2.default)());
app.options('*', (0, _cors2.default)());
app.use(_bodyParser2.default.urlencoded({
  extended: false
}));
app.use(_bodyParser2.default.json());
app.use('/api/infinity2015/weather', _router2.default);