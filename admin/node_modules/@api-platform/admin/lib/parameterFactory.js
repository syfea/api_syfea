"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _reactAdmin = require("react-admin");

var _react = _interopRequireDefault(require("react"));

function guessType(parameter, apiPlatform) {
  var type = guessTypeForApiPlatform(parameter, apiPlatform);
  return type !== undefined ? type : guessTypeFromRange(parameter.range);
}

function guessTypeForApiPlatform(parameter) {
  var apiPlatform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (apiPlatform) {
    // List filters are discarded because there is no built-in filter component in react-admin that can handle this case.
    if (parameter.variable.match(/.*\[\]/i)) return null; // Order filters are discaded because it is only used to know if a column should be sortable or not.

    if (parameter.variable.match(/^order\[.+\]$/)) return null;
    if (parameter.variable.match(/.*\[between\]/i) !== null) return 'between';
  }
}

function guessTypeFromRange(range) {
  switch (range) {
    case 'http://www.w3.org/2001/XMLSchema#integer':
    case 'http://www.w3.org/2001/XMLSchema#float':
      return 'number';

    case 'http://www.w3.org/2001/XMLSchema#boolean':
      return 'nullableBoolean';

    case 'http://www.w3.org/2001/XMLSchema#dateTime':
      return 'date';

    default:
      return 'text';
  }
}

var _default = function _default(parameter, options) {
  var type = guessType(parameter, options.apiPlatform);

  switch (type) {
    case 'date':
      return _react.default.createElement(_reactAdmin.DateInput, (0, _extends2.default)({
        key: parameter.variable,
        source: parameter.variable
      }, options));

    case 'nullableBoolean':
      return _react.default.createElement(_reactAdmin.NullableBooleanInput, (0, _extends2.default)({
        key: parameter.variable,
        source: parameter.variable
      }, options));
    // TODO : create a dedicated Input

    case 'between':
      return null;

    case 'number':
      return _react.default.createElement(_reactAdmin.NumberInput, (0, _extends2.default)({
        key: parameter.variable,
        source: parameter.variable
      }, options));

    case 'text':
      return _react.default.createElement(_reactAdmin.TextInput, (0, _extends2.default)({
        key: parameter.variable,
        source: parameter.variable
      }, options));

    default:
  }
};

exports.default = _default;