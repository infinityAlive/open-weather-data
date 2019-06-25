"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("dotenv/config");

const config = {
  cwbAuthorization: process.env['CWB_AUTHORIZATION'],
  mongoDbUri: process.env['MONGODB_URI']
};
exports.default = config;