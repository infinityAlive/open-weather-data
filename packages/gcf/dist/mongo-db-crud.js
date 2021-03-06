"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceOne = undefined;

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mongoDbUri = _config2.default.mongoDbUri;

const retrieveCwbDb = (() => {
  let mongoClient, cwbDb;
  return async () => {
    if (!mongoClient) {
      mongoClient = await _mongodb2.default.MongoClient.connect(mongoDbUri, {
        useNewUrlParser: true,
        poolSize: 20
      });
    }

    if (!cwbDb) {
      cwbDb = mongoClient.db('cwb');
    }

    return cwbDb;
  };
})();

const replaceOne = async (collectionName, query, document, options) => {
  try {
    const db = await retrieveCwbDb();
    const updateResult = await db.collection(collectionName).replaceOne(query, document, options);
    console.log(`Result of replace ${collectionName}, ok = ${updateResult.result.ok}`);
  } catch (error) {
    console.error(error);
  }
};

exports.replaceOne = replaceOne;