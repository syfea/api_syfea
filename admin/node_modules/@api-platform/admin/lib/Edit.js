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
  var defaultInputFactory = options.inputFactory,
      resource = options.resource;
  var customFields = resource.editFields,
      _resource$editProps = resource.editProps,
      editProps = _resource$editProps === void 0 ? {} : _resource$editProps,
      defaultFields = resource.writableFields;
  var _editProps$options = editProps.options;
  _editProps$options = _editProps$options === void 0 ? {} : _editProps$options;
  var customInputFactory = _editProps$options.inputFactory;
  return (0, _objectSpread2.default)({}, props, editProps, {
    options: (0, _objectSpread2.default)({}, options, {
      fields: customFields || defaultFields.filter(function (_ref2) {
        var deprecated = _ref2.deprecated;
        return !deprecated;
      }),
      inputFactory: customInputFactory || defaultInputFactory
    })
  });
};

var Edit = function Edit(props) {
  var _resolveProps = resolveProps(props),
      _resolveProps$options = _resolveProps.options,
      api = _resolveProps$options.api,
      fields = _resolveProps$options.fields,
      inputFactory = _resolveProps$options.inputFactory,
      resource = _resolveProps$options.resource,
      _resolveProps$addIdIn = _resolveProps.addIdInput,
      addIdInput = _resolveProps$addIdIn === void 0 ? false === hasIdentifier(fields) : _resolveProps$addIdIn;

  return _react.default.createElement(_reactAdmin.Edit, props, _react.default.createElement(_reactAdmin.SimpleForm, null, addIdInput && _react.default.createElement(_reactAdmin.DisabledInput, {
    source: "id"
  }), fields.map(function (field) {
    return inputFactory(field, {
      api: api,
      resource: resource
    });
  })));
};

Edit.propTypes = {
  addIdInput: _propTypes.default.bool,
  options: _propTypes.default.shape({
    api: _propTypes.default.instanceOf(_Api.default).isRequired,
    inputFactory: _propTypes.default.func.isRequired,
    resource: _propTypes.default.instanceOf(_Resource.default).isRequired
  })
};
var _default = Edit;
exports.default = _default;