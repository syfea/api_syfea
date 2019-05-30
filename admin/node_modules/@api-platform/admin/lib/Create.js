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

var resolveProps = function resolveProps(props) {
  var options = props.options;
  var defaultInputFactory = options.inputFactory,
      resource = options.resource;
  var customFields = resource.createFields,
      _resource$createProps = resource.createProps,
      createProps = _resource$createProps === void 0 ? {} : _resource$createProps,
      defaultFields = resource.writableFields;
  var _createProps$options = createProps.options;
  _createProps$options = _createProps$options === void 0 ? {} : _createProps$options;
  var customInputFactory = _createProps$options.inputFactory;
  return (0, _objectSpread2.default)({}, props, createProps, {
    options: (0, _objectSpread2.default)({}, options, {
      fields: customFields || defaultFields.filter(function (_ref) {
        var deprecated = _ref.deprecated;
        return !deprecated;
      }),
      inputFactory: customInputFactory || defaultInputFactory
    })
  });
};

var Create = function Create(props) {
  var _resolveProps = resolveProps(props),
      _resolveProps$options = _resolveProps.options,
      api = _resolveProps$options.api,
      fields = _resolveProps$options.fields,
      inputFactory = _resolveProps$options.inputFactory,
      resource = _resolveProps$options.resource;

  return _react.default.createElement(_reactAdmin.Create, props, _react.default.createElement(_reactAdmin.SimpleForm, null, fields.map(function (field) {
    return inputFactory(field, {
      api: api,
      resource: resource
    });
  })));
};

Create.propTypes = {
  options: _propTypes.default.shape({
    api: _propTypes.default.instanceOf(_Api.default).isRequired,
    inputFactory: _propTypes.default.func.isRequired,
    resource: _propTypes.default.instanceOf(_Resource.default).isRequired
  })
};
var _default = Create;
exports.default = _default;