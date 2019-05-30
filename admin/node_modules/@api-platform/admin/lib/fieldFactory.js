"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.isFieldSortable = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _reactAdmin = require("react-admin");

var _react = _interopRequireDefault(require("react"));

var _getReferenceNameField = _interopRequireDefault(require("./getReferenceNameField"));

var isFieldSortable = function isFieldSortable(field, resource) {
  return resource.parameters.filter(function (parameter) {
    return parameter.variable === field.name;
  }).length > 0 && resource.parameters.filter(function (parameter) {
    return parameter.variable === "order[".concat(field.name, "]");
  }).length > 0;
};

exports.isFieldSortable = isFieldSortable;

var _default = function _default(field, options) {
  var props = (0, _objectSpread2.default)({}, field.fieldProps);

  if (field.field) {
    return _react.default.createElement(field.field, (0, _extends2.default)({
      key: field.name,
      options: options,
      source: field.name
    }, props));
  }

  if (null !== field.reference) {
    if (1 === field.maxCardinality) {
      return _react.default.createElement(_reactAdmin.ReferenceField, (0, _extends2.default)({
        source: field.name,
        reference: field.reference.name,
        key: field.name,
        sortable: isFieldSortable(field, options.resource)
      }, props, {
        allowEmpty: true
      }), _react.default.createElement(_reactAdmin.ChipField, {
        source: (0, _getReferenceNameField.default)(field.reference)
      }));
    }

    var referenceNameField = (0, _getReferenceNameField.default)(field.reference);
    return _react.default.createElement(_reactAdmin.ReferenceArrayField, (0, _extends2.default)({
      source: field.name,
      reference: field.reference.name,
      key: field.name,
      sortable: isFieldSortable(field, options.resource)
    }, props), _react.default.createElement(_reactAdmin.SingleFieldList, null, _react.default.createElement(_reactAdmin.ChipField, {
      source: referenceNameField,
      key: referenceNameField
    })));
  }

  switch (field.id) {
    case 'http://schema.org/email':
      return _react.default.createElement(_reactAdmin.EmailField, (0, _extends2.default)({
        key: field.name,
        source: field.name,
        sortable: isFieldSortable(field, options.resource)
      }, props));

    case 'http://schema.org/url':
      return _react.default.createElement(_reactAdmin.UrlField, (0, _extends2.default)({
        key: field.name,
        source: field.name,
        sortable: isFieldSortable(field, options.resource)
      }, props));

    default: // Do nothing

  }

  switch (field.range) {
    case 'http://www.w3.org/2001/XMLSchema#integer':
    case 'http://www.w3.org/2001/XMLSchema#float':
      return _react.default.createElement(_reactAdmin.NumberField, (0, _extends2.default)({
        key: field.name,
        source: field.name,
        sortable: isFieldSortable(field, options.resource)
      }, props));

    case 'http://www.w3.org/2001/XMLSchema#date':
    case 'http://www.w3.org/2001/XMLSchema#dateTime':
      return _react.default.createElement(_reactAdmin.DateField, (0, _extends2.default)({
        key: field.name,
        source: field.name,
        sortable: isFieldSortable(field, options.resource)
      }, props));

    case 'http://www.w3.org/2001/XMLSchema#boolean':
      return _react.default.createElement(_reactAdmin.BooleanField, (0, _extends2.default)({
        key: field.name,
        source: field.name,
        sortable: isFieldSortable(field, options.resource)
      }, props));

    default:
      return _react.default.createElement(_reactAdmin.TextField, (0, _extends2.default)({
        key: field.name,
        source: field.name,
        sortable: isFieldSortable(field, options.resource)
      }, props));
  }
};

exports.default = _default;