"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _reactAdmin = require("react-admin");

var _react = _interopRequireDefault(require("react"));

var _Create = _interopRequireDefault(require("./Create"));

var _Edit = _interopRequireDefault(require("./Edit"));

var _List = _interopRequireDefault(require("./List"));

var _Show = _interopRequireDefault(require("./Show"));

var _default = function _default(resource, api, fieldFactory, inputFactory, parameterFactory) {
  var _resource$create = resource.create,
      create = _resource$create === void 0 ? _Create.default : _resource$create,
      _resource$edit = resource.edit,
      edit = _resource$edit === void 0 ? _Edit.default : _resource$edit,
      _resource$list = resource.list,
      list = _resource$list === void 0 ? _List.default : _resource$list,
      icon = resource.icon,
      name = resource.name,
      props = resource.props,
      _resource$show = resource.show,
      show = _resource$show === void 0 ? _Show.default : _resource$show;
  return _react.default.createElement(_reactAdmin.Resource, (0, _extends2.default)({}, props, {
    create: create,
    edit: edit,
    key: name,
    list: list,
    name: name,
    icon: icon,
    options: {
      api: api,
      fieldFactory: fieldFactory,
      inputFactory: inputFactory,
      parameterFactory: parameterFactory,
      resource: resource
    },
    show: show
  }));
};

exports.default = _default;