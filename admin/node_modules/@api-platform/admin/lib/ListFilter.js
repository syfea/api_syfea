"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _reactAdmin = require("react-admin");

var _react = _interopRequireDefault(require("react"));

var resolveProps = function resolveProps(props) {
  var options = props.options;
  var parameterFactory = options.parameterFactory,
      parameters = options.parameters;
  return (0, _objectSpread2.default)({}, props, {
    parameterFactory: parameterFactory,
    parameters: parameters
  });
};

var ListFilter = function ListFilter(props) {
  var _resolveProps = resolveProps(props),
      parameters = _resolveProps.parameters,
      parameterFactory = _resolveProps.parameterFactory;

  var parameterAlwaysOn = parameters.length < 8;
  return _react.default.createElement(_reactAdmin.Filter, props, parameters.length > 0 && parameters.map(function (parameter) {
    return parameterFactory(parameter, {
      alwaysOn: parameterAlwaysOn
    });
  }));
};

var _default = ListFilter;
exports.default = _default;