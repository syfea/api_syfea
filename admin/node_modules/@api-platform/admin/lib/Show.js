"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _Api = _interopRequireDefault(require("@api-platform/api-doc-parser/lib/Api"));

var _Resource = _interopRequireDefault(require("@api-platform/api-doc-parser/lib/Resource"));

var _reactAdmin = require("react-admin");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var hasIdentifier = function hasIdentifier(fields) {
  return undefined !== fields.find(function (_ref) {
    var id = _ref.id;
    return 'http://schema.org/identifier' === id;
  });
};

var resolveProps = function resolveProps(props) {
  var options = props.options;
  var defaultFieldFactory = options.fieldFactory,
      resource = options.resource;
  var customFields = resource.showFields,
      defaultFields = resource.readableFields,
      _resource$showProps = resource.showProps,
      showProps = _resource$showProps === void 0 ? {} : _resource$showProps;
  var _showProps$options = showProps.options;
  _showProps$options = _showProps$options === void 0 ? {} : _showProps$options;
  var customFieldFactory = _showProps$options.fieldFactory;
  return (0, _objectSpread2.default)({}, props, showProps, {
    options: (0, _objectSpread2.default)({}, options, {
      fields: customFields || defaultFields.filter(function (_ref2) {
        var deprecated = _ref2.deprecated;
        return !deprecated;
      }),
      fieldFactory: customFieldFactory || defaultFieldFactory
    })
  });
};

var Show = function Show(props) {
  var _resolveProps = resolveProps(props),
      _resolveProps$options = _resolveProps.options,
      api = _resolveProps$options.api,
      fieldFactory = _resolveProps$options.fieldFactory,
      fields = _resolveProps$options.fields,
      resource = _resolveProps$options.resource,
      _resolveProps$addIdFi = _resolveProps.addIdField,
      addIdField = _resolveProps$addIdFi === void 0 ? false === hasIdentifier(fields) : _resolveProps$addIdFi;

  return _react.default.createElement(_reactAdmin.Show, props, _react.default.createElement(_reactAdmin.SimpleShowLayout, null, addIdField && _react.default.createElement(_reactAdmin.TextField, {
    source: "id"
  }), fields.map(function (field) {
    return fieldFactory(field, {
      api: api,
      resource: resource
    });
  })));
};

Show.propTypes = {
  addIdField: _propTypes.default.bool,
  options: _propTypes.default.shape({
    api: _propTypes.default.instanceOf(_Api.default).isRequired,
    fieldFactory: _propTypes.default.func.isRequired,
    resource: _propTypes.default.instanceOf(_Resource.default).isRequired,
    showProps: _propTypes.default.object
  })
};
var _default = Show;
exports.default = _default;