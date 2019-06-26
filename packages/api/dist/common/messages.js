"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const HttpStatus = {
  OK_200: 200,
  BAD_REQUEST_400: 400,
  SERVER_ERROR_500: 500,
  UNAUTHORIZED_401: 401
};
const LoginInfo = {
  REGISTER_ACCOUNT_IS_EXISTED: 'Account is existed',
  REGISTER_SUCCESS: 'Register successfully',
  REGISTER_FAILED: 'Register failed',
  LOGIN_SUCCESS: 'Login successfully',
  LOGIN_FAILED: 'Login failed',
  LOGIN_PWD_DIFF: 'Password is wrong',
  LOGIN_ACCOUNT_IS_EMPTY: 'Account is empty',
  LOGOUT_SUCCESS: 'Logout successfully',
  LOGOUT_FAILED: 'Logout failed',
  SESSION_EXISTED: 'Session is existed',
  SESSION_NOT_EXISTED: 'Session is not existed'
};
exports.HttpStatus = HttpStatus;
exports.LoginInfo = LoginInfo;