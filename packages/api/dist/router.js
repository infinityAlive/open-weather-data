"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _weather = require("./api/weather");

var weatherApi = _interopRequireWildcard(_weather);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// import router from './server'
const router = _express2.default.Router();

let sess;
router.get('/', (req, res) => {
  sess = req.session;

  if (sess.email) {
    return res.redirect('/admin');
  }

  res.sendFile('server.js.html');
});
router.post('/login.js', (req, res) => {
  sess = req.session;
  sess.email = req.body.email;
  res.end('done');
});
router.get('/admin', (req, res) => {
  sess = req.session;

  if (sess.email) {
    res.write(`<h1>Hello ${sess.email} </h1>
`);
    res.end('<a href=' + '/logout' + '>Logout</a>');
  } else {
    res.write('<h1>Please login.js first.</h1>');
    res.end('<a href=' + '/' + '>Login</a>');
  }
});
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return console.log(err);
    }

    res.redirect('/');
  });
});
router.get('/cities', weatherApi.retrieveCitiesWeatherInfo);
exports.default = router;