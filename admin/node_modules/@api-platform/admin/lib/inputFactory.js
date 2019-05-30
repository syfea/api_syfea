"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _reactAdmin = require("react-admin");

var _react = _interopRequireDefault(require("react"));

var _getReferenceNameField = _interopRequireDefault(require("./getReferenceNameField"));

var _default = function _default(field, options) {
  var props = (0, _objectSpread2.default)({}, field.inputProps);

  if (field.input) {
    return _react.default.createElement(field.input, (0, _extends2.default)({
      key: field.name,
      options: options,
      source: field.name
    }, props));
  }

  if (!props.validate && field.required) props.validate = [(0, _reactAdmin.required)()];

  if (null !== field.reference) {
    if (1 === field.maxCardinality) {
      return _react.default.createElement(_reactAdmin.ReferenceInput, (0, _extends2.default)({
        key: field.name,
        label: field.name,
        reference: field.reference.name,
        source: field.name
      }, props, {
        allowEmpty: true
      }), _react.default.createElement(_reactAdmin.SelectInput, {
        optionText: (0, _getReferenceNameField.default)(field.reference)
      }));
    }

    return _react.default.createElement(_reactAdmin.ReferenceArrayInput, (0, _extends2.default)({
      key: field.name,
      label: field.name,
      reference: field.reference.name,
      source: field.name
    }, props, {
      allowEmpty: true
    }), _react.default.createElement(_reactAdmin.SelectArrayInput, {
      optionText: (0, _getReferenceNameField.default)(field.reference)
    }));
  }

  if ('http://schema.org/identifier' === field.id) {
    var name = options.resource.name,
        _options$prefix = options.prefix,
        prefix = _options$prefix === void 0 ? "/".concat(name, "/") : _options$prefix;

    props.format = function (value) {
      return 0 === value.indexOf(prefix) ? value.substr(prefix.length) : value;
    };

    props.parse = function (value) {
      return -1 !== value.indexOf(prefix) ? prefix + value : value;
    };
  }

  switch (field.range) {
    case 'http://www.w3.org/2001/XMLSchema#array':
      return _react.default.createElement(_reactAdmin.ArrayInput, (0, _extends2.default)({
        key: field.name,
        source: field.name
      }, props), _react.default.createElement(_reactAdmin.SimpleFormIterator, null, _react.default.createElement(_reactAdmin.TextInput, null)));

    case 'http://www.w3.org/2001/XMLSchema#integer':
      return _react.default.createElement(_reactAdmin.NumberInput, (0, _extends2.default)({
        key: field.name,
        source: field.name
      }, props));

    case 'http://www.w3.org/2001/XMLSchema#decimal':
      return _react.default.createElement(_reactAdmin.NumberInput, (0, _extends2.default)({
        key: field.name,
        source: field.name,
        step: "0.1"
      }, props));

    case 'http://www.w3.org/2001/XMLSchema#boolean':
      return _react.default.createElement(_reactAdmin.BooleanInput, (0, _extends2.default)({
        key: field.name,
        source: field.name
      }, props));

    case 'http://www.w3.org/2001/XMLSchema#date':
    case 'http://www.w3.org/2001/XMLSchema#dateTime':
      return _react.default.createElement(_reactAdmin.DateInput, (0, _extends2.default)({
        key: field.name,
        source: field.name
      }, props));

    default:
      return _react.default.createElement(_reactAdmin.TextInput, (0, _extends2.default)({
        key: field.name,
        source: field.name
      }, props));
  }
};

exports.default = _default;