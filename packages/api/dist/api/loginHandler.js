"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkSession = exports.logout = exports.login = exports.register = undefined;

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _loginService = require("../service/login-service");

var _loginService2 = _interopRequireDefault(_loginService);

var _messages = require("../common/messages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import router from './server'
const register = (request, response) => {
  let corsFn = (0, _cors2.default)();
  corsFn(request, response, async () => {
    if (request.method === 'POST') {
      const account = request.body.account;
      const password = request.body.password;
      const loginMessage = await _loginService2.default.register(account, password);

      if (loginMessage.indexOf('failed') >= 0) {
        response.status(_messages.HttpStatus.SERVER_ERROR_500).send(loginMessage);
      } else {
        response.status(_messages.HttpStatus.OK_200).send(loginMessage);
      }
    }
  });
};

const login = (request, response) => {
  let corsFn = (0, _cors2.default)();
  corsFn(request, response, async () => {
    if (request.method === 'POST') {
      const account = request.body.account;
      const password = request.body.password;
      const loginMessage = await _loginService2.default.retrieve(account, password);

      if (loginMessage.indexOf('failed') >= 0) {
        response.status(_messages.HttpStatus.UNAUTHORIZED_401).send(loginMessage);
      } else {
        response.status(_messages.HttpStatus.OK_200).send(loginMessage);
      }
    }
  });
};

const logout = (request, response) => {
  let corsFn = (0, _cors2.default)();
  corsFn(request, response, async () => {
    if (request.method === 'POST') {
      // request.session.destroy(
      //   err => {
      //     if (err) {
      //       console.error(error)
      //       response.status(HttpStatus.SERVER_ERROR_500).send(LoginInfo.LOGOUT_FAILED)
      //     }
      //   })
      response.status(_messages.HttpStatus.OK_200).send(_messages.LoginInfo.LOGOUT_SUCCESS);
    }
  });
};

const checkSession = (request, response) => {
  let corsFn = (0, _cors2.default)();
  corsFn(request, response, async () => {
    if (request.method === 'POST') {
      if (request.session.account) {
        response.status(_messages.HttpStatus.OK_200).send();
      } else {
        response.status(_messages.HttpStatus.UNAUTHORIZED_401).send(_messages.LoginInfo.LOGOUT_FAILED);
      }
    }
  });
};

exports.register = register;
exports.login = login;
exports.logout = logout;
exports.checkSession = checkSession;