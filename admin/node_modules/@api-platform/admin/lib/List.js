"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _Api = _interopRequireDefault(require("@api-platform/api-doc-parser/lib/Api"));

var _Resource = _interopRequireDefault(require("@api-platform/api-doc-parser/lib/Resource"));

var _reactAdmin = require("react-admin");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _ListFilter = _interopRequireDefault(require("./ListFilter"));

var _fieldFactory = require("./fieldFactory");

var hasIdentifier = function hasIdentifier(fields) {
  return undefined !== fields.find(function (_ref) {
    var id = _ref.id;
    return 'http://schema.org/identifier' === id;
  });
};

var resolveProps = function resolveProps(props) {
  var options = props.options;
  var defaultFieldFactory = options.fieldFactory,
      parameterFactory = options.parameterFactory,
      resource = options.resource;
  var customFields = resource.listFields,
      _resource$listProps = resource.listProps,
      listProps = _resource$listProps === void 0 ? {} : _resource$listProps,
      defaultFields = resource.readableFields;
  var _listProps$options = listProps.options;
  _listProps$options = _listProps$options === void 0 ? {} : _listProps$options;
  var customFieldFactory = _listProps$options.fieldFactory;
  return (0, _objectSpread2.default)({}, props, listProps, {
    options: (0, _objectSpread2.default)({}, options, {
      fields: customFields || defaultFields.filter(function (_ref2) {
        var deprecated = _ref2.deprecated;
        return !deprecated;
      }),
      fieldFactory: customFieldFactory || defaultFieldFactory,
      parameterFactory: parameterFactory,
      parameters: resource.parameters
    })
  });
};

var List = function List(props) {
  var _resolveProps = resolveProps(props),
      hasEdit = _resolveProps.hasEdit,
      hasShow = _resolveProps.hasShow,
      _resolveProps$options = _resolveProps.options,
      api = _resolveProps$options.api,
      fieldFactory = _resolveProps$options.fieldFactory,
      fields = _resolveProps$options.fields,
      parameterFactory = _resolveProps$options.parameterFactory,
      parameters = _resolveProps$options.parameters,
      resource = _resolveProps$options.resource,
      _resolveProps$addIdFi = _resolveProps.addIdField,
      addIdField = _resolveProps$addIdFi === void 0 ? false === hasIdentifier(fields) : _resolveProps$addIdFi;

  return _react.default.createElement(_reactAdmin.List, (0, _extends2.default)({}, props, {
    filters: _react.default.createElement(_ListFilter.default, {
      options: {
        parameterFactory: parameterFactory,
        parameters: parameters
      }
    })
  }), _react.default.createElement(_reactAdmin.Datagrid, null, addIdField && _react.default.createElement(_reactAdmin.TextField, {
    source: "id",
    sortable: (0, _fieldFactory.isFieldSortable)({
      name: 'id'
    }, resource)
  }), fields.map(function (field) {
    return fieldFactory(field, {
      api: api,
      resource: resource
    });
  }), hasShow && _react.default.createElement(_reactAdmin.ShowButton, null), hasEdit && _react.default.createElement(_reactAdmin.EditButton, null)));
};

List.defaultProps = {
  perPage: 30 // Default value in API Platform

};
List.propTypes = {
  addIdField: _propTypes.default.bool,
  options: _propTypes.default.shape({
    api: _propTypes.default.instanceOf(_Api.default).isRequired,
    fieldFactory: _propTypes.default.func.isRequired,
    parameterFactory: _propTypes.default.func.isRequired,
    listProps: _propTypes.default.object,
    resource: _propTypes.default.instanceOf(_Resource.default).isRequired
  }),
  perPage: _propTypes.default.number,
  hasEdit: _propTypes.default.bool.isRequired,
  hasShow: _propTypes.default.bool.isRequired
};
var _default = List;
exports.default = _default;