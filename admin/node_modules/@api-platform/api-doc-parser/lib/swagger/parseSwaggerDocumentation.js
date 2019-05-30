"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.default = parseSwaggerDocumentation;

var _Api = require("../Api");

var _Api2 = _interopRequireDefault(_Api);

var _handleJson = require("./handleJson");

var _handleJson2 = _interopRequireDefault(_handleJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseSwaggerDocumentation(entrypointUrl) {
  entrypointUrl = (0, _handleJson.removeTrailingSlash)(entrypointUrl);
  return fetch(entrypointUrl).then(function (res) {
    return res.json();
  }).then(function (response) {
    var title = response.info.title;
    var resources = (0, _handleJson2.default)(response, entrypointUrl);

    return _promise2.default.resolve({
      api: new _Api2.default(entrypointUrl, { title: title, resources: resources }),
      response: response,
      status: response.status
    });
  }, function (_ref) {
    var response = _ref.response;
    return _promise2.default.reject({
      api: new _Api2.default(entrypointUrl, { resources: [] }),
      response: response,
      status: response.status
    });
  });
}