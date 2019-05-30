"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _HttpError = _interopRequireDefault(require("ra-core/lib/util/HttpError"));

var _fetchJsonLd = _interopRequireDefault(require("@api-platform/api-doc-parser/lib/hydra/fetchJsonLd"));

var _parseHydraDocumentation = require("@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation");

var _jsonld = require("jsonld");

/**
 * Sends HTTP requests to a Hydra API.
 *
 * Adapted from react-admin
 *
 * @copyright Kévin Dunglas
 *
 * @param {string} url
 * @param {object} options
 * @return {object}
 */
var _default = function _default(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var requestHeaders = options.headers || new Headers();

  if (options.user && options.user.authenticated && options.user.token) {
    requestHeaders.set('Authorization', options.user.token);
  }

  return (0, _fetchJsonLd.default)(url, (0, _objectSpread2.default)({}, options, {
    headers: requestHeaders
  })).then(function (data) {
    var status = data.response.status;

    if (status < 200 || status >= 300) {
      return _jsonld.promises.expand(data.body, {
        base: (0, _parseHydraDocumentation.getDocumentationUrlFromHeaders)(data.response.headers)
      }).then(function (json) {
        return Promise.reject(new _HttpError.default(json[0]['http://www.w3.org/ns/hydra/core#description'][0]['@value'], status));
      }).catch(function (e) {
        if (e.hasOwnProperty('body')) {
          return Promise.reject(e);
        }

        return Promise.reject(new _HttpError.default(data.response.statusText, status));
      });
    }

    return {
      status: status,
      headers: data.response.headers,
      json: data.body
    };
  });
};

exports.default = _default;