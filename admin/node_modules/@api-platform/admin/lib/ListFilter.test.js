"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _Field = _interopRequireDefault(require("@api-platform/api-doc-parser/lib/Field"));

var _Resource = _interopRequireDefault(require("@api-platform/api-doc-parser/lib/Resource"));

var _reactAdmin = require("react-admin");

var _enzyme = require("enzyme");

var _parameterFactory = _interopRequireDefault(require("./parameterFactory"));

var _ListFilter = _interopRequireDefault(require("./ListFilter"));

var _Parameter = _interopRequireDefault(require("@api-platform/api-doc-parser/lib/Parameter"));

var entrypoint = 'http://entrypoint';
var resourceData = {
  name: 'user',
  fields: [new _Field.default('fieldA', {
    id: 'http://schema.org/fieldA',
    range: 'http://www.w3.org/2001/XMLSchema#string',
    reference: null,
    required: true
  }), new _Field.default('fieldB', {
    id: 'http://schema.org/fieldB',
    range: 'http://www.w3.org/2001/XMLSchema#string',
    reference: null,
    required: true
  }), new _Field.default('deprecatedField', {
    id: 'http://localhost/deprecatedField',
    range: 'http://www.w3.org/2001/XMLSchema#string',
    reference: null,
    required: true,
    deprecated: true
  })],
  parameters: [new _Parameter.default('fieldA', '', false, ''), new _Parameter.default('order[fieldA]', '', false, '')],
  url: "".concat(entrypoint, "/users")
};
describe('<ListFilter />', function () {
  test('without overrides', function () {
    var defaultParameterFactory = jest.fn(_parameterFactory.default);
    var resource = new _Resource.default(resourceData.name, resourceData.url, resourceData);
    var parameters = resource.parameters;
    var render = (0, _enzyme.shallow)(_react.default.createElement(_ListFilter.default, {
      options: {
        parameters: parameters,
        parameterFactory: defaultParameterFactory
      }
    }));
    expect(defaultParameterFactory).toHaveBeenCalledTimes(2);
    expect(render.find(_reactAdmin.TextInput).getElements()).toHaveLength(1);
    expect(render.find(_reactAdmin.TextInput).get(0).props.source).toEqual('fieldA');
  });
});