"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _Api = _interopRequireDefault(require("@api-platform/api-doc-parser/lib/Api"));

var _reactAdmin = require("react-admin");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _fieldFactory = _interopRequireDefault(require("./fieldFactory"));

var _inputFactory = _interopRequireDefault(require("./inputFactory"));

var _parameterFactory = _interopRequireDefault(require("./parameterFactory"));

var _resourceFactory = _interopRequireDefault(require("./resourceFactory"));

var AdminBuilder = function AdminBuilder(props) {
  var api = props.api,
      fieldFactory = props.fieldFactory,
      inputFactory = props.inputFactory,
      resourceFactory = props.resourceFactory,
      parameterFactory = props.parameterFactory,
      _props$title = props.title,
      title = _props$title === void 0 ? api.title : _props$title,
      _props$resources = props.resources,
      resources = _props$resources === void 0 ? api.resources.filter(function (_ref) {
    var deprecated = _ref.deprecated;
    return !deprecated;
  }) : _props$resources;
  return _react.default.createElement(_reactAdmin.Admin, (0, _extends2.default)({}, props, {
    title: title
  }), resources.map(function (resource) {
    return resourceFactory(resource, api, fieldFactory, inputFactory, parameterFactory);
  }));
};

AdminBuilder.defaultProps = {
  fieldFactory: _fieldFactory.default,
  inputFactory: _inputFactory.default,
  resourceFactory: _resourceFactory.default,
  parameterFactory: _parameterFactory.default
};
AdminBuilder.propTypes = {
  api: _propTypes.default.instanceOf(_Api.default).isRequired,
  fieldFactory: _propTypes.default.func,
  inputFactory: _propTypes.default.func,
  parameterFactory: _propTypes.default.func,
  resourceFactory: _propTypes.default.func,
  dataProvider: _propTypes.default.func.isRequired,
  resource: _propTypes.default.array
};
var _default = AdminBuilder;
exports.default = _default;