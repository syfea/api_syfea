"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _Api = _interopRequireDefault(require("@api-platform/api-doc-parser/lib/Api"));

var _Field = _interopRequireDefault(require("@api-platform/api-doc-parser/lib/Field"));

var _Parameter = _interopRequireDefault(require("@api-platform/api-doc-parser/lib/Parameter"));

var _Resource = _interopRequireDefault(require("@api-platform/api-doc-parser/lib/Resource"));

var _reactAdmin = require("react-admin");

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _fieldFactory = _interopRequireDefault(require("./fieldFactory"));

var _parameterFactory = _interopRequireDefault(require("./parameterFactory"));

var _List = _interopRequireDefault(require("./List"));

var entrypoint = 'http://entrypoint';
var apiData = {
  entrypoint: entrypoint
};
var resourceData = {
  name: 'user',
  readableFields: [new _Field.default('fieldA', {
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
describe('<List />', function () {
  test('without overrides', function () {
    var defaultFieldFactory = jest.fn(_fieldFactory.default);
    var defaultParameterFactory = jest.fn(_parameterFactory.default);
    var resource = new _Resource.default(resourceData.name, resourceData.url, resourceData);
    var api = new _Api.default(apiData.entrypoint, (0, _objectSpread2.default)({}, apiData, {
      resources: [resource]
    }));
    var render = (0, _enzyme.shallow)(_react.default.createElement(_List.default, {
      hasEdit: true,
      hasShow: true,
      options: {
        api: api,
        fieldFactory: defaultFieldFactory,
        parameterFactory: defaultParameterFactory,
        resource: resource
      },
      location: {},
      match: {},
      resource: ""
    }));
    expect(defaultFieldFactory).toHaveBeenCalledTimes(2);
    expect(render.find(_reactAdmin.TextField).length).toEqual(3);
    expect(render.find(_reactAdmin.TextField).get(0).props.source).toEqual('id');
    expect(render.find(_reactAdmin.TextField).get(1).props.source).toEqual('fieldA');
    expect(render.find(_reactAdmin.TextField).get(2).props.source).toEqual('fieldB');
  });
  test('without default identifier field', function () {
    var defaultFieldFactory = jest.fn(_fieldFactory.default);
    var defaultParameterFactory = jest.fn(_parameterFactory.default);
    var resource = new _Resource.default(resourceData.name, resourceData.url, (0, _objectSpread2.default)({}, resourceData, {
      listProps: {
        addIdField: false
      }
    }));
    var api = new _Api.default(apiData.entrypoint, (0, _objectSpread2.default)({}, apiData, {
      resources: [resource]
    }));
    var render = (0, _enzyme.shallow)(_react.default.createElement(_List.default, {
      hasEdit: true,
      hasShow: true,
      options: {
        api: api,
        fieldFactory: defaultFieldFactory,
        parameterFactory: defaultParameterFactory,
        resource: resource
      },
      location: {},
      match: {},
      resource: ""
    }));
    expect(defaultFieldFactory).toHaveBeenCalledTimes(2);
    expect(render.find(_reactAdmin.TextField).length).toEqual(2);
    expect(render.find(_reactAdmin.TextField).get(0).props.source).toEqual('fieldA');
    expect(render.find(_reactAdmin.TextField).get(1).props.source).toEqual('fieldB');
  });
  test('with custom fieldFactory', function () {
    var customFieldFactory = jest.fn(_fieldFactory.default);
    var defaultFieldFactory = jest.fn(_fieldFactory.default);
    var defaultParameterFactory = jest.fn(_parameterFactory.default);
    var resource = new _Resource.default(resourceData.name, resourceData.url, (0, _objectSpread2.default)({}, resourceData, {
      listProps: {
        options: {
          fieldFactory: customFieldFactory
        }
      }
    }));
    var api = new _Api.default(apiData.entrypoint, (0, _objectSpread2.default)({}, apiData, {
      resources: [resource]
    }));
    var render = (0, _enzyme.shallow)(_react.default.createElement(_List.default, {
      hasEdit: true,
      hasShow: true,
      options: {
        api: api,
        fieldFactory: defaultFieldFactory,
        parameterFactory: defaultParameterFactory,
        resource: resource
      },
      location: {},
      match: {},
      resource: ""
    }));
    expect(customFieldFactory).toHaveBeenCalledTimes(2);
    expect(defaultFieldFactory).toHaveBeenCalledTimes(0);
    expect(render.find(_reactAdmin.TextField).length).toEqual(3);
    expect(render.find(_reactAdmin.TextField).get(0).props.source).toEqual('id');
    expect(render.find(_reactAdmin.TextField).get(1).props.source).toEqual('fieldA');
    expect(render.find(_reactAdmin.TextField).get(2).props.source).toEqual('fieldB');
  });
  test('with custom fields', function () {
    var defaultFieldFactory = jest.fn(_fieldFactory.default);
    var defaultParameterFactory = jest.fn(_parameterFactory.default);
    var resource = new _Resource.default(resourceData.name, resourceData.url, (0, _objectSpread2.default)({}, resourceData, {
      listFields: [new _Field.default('fieldC', {
        id: 'http://schema.org/fieldC',
        range: 'http://www.w3.org/2001/XMLSchema#string',
        reference: null,
        required: true
      })]
    }));
    var api = new _Api.default(apiData.entrypoint, (0, _objectSpread2.default)({}, apiData, {
      resources: [resource]
    }));
    var render = (0, _enzyme.shallow)(_react.default.createElement(_List.default, {
      hasEdit: true,
      hasShow: true,
      options: {
        api: api,
        fieldFactory: defaultFieldFactory,
        parameterFactory: defaultParameterFactory,
        resource: resource
      },
      location: {},
      match: {},
      resource: ""
    }));
    expect(defaultFieldFactory).toHaveBeenCalledTimes(1);
    expect(render.find(_reactAdmin.TextField).length).toEqual(2);
    expect(render.find(_reactAdmin.TextField).get(0).props.source).toEqual('id');
    expect(render.find(_reactAdmin.TextField).get(1).props.source).toEqual('fieldC');
  });
  test('with readable identifier', function () {
    var defaultFieldFactory = jest.fn(_fieldFactory.default);
    var defaultParameterFactory = jest.fn(_parameterFactory.default);
    var resource = new _Resource.default(resourceData.name, resourceData.url, (0, _objectSpread2.default)({}, resourceData, {
      listProps: {
        addIdField: false
      },
      readableFields: [].concat((0, _toConsumableArray2.default)(resourceData.readableFields), [new _Field.default('id', {
        id: 'http://schema.org/identifier',
        range: 'http://www.w3.org/2001/XMLSchema#string',
        reference: null,
        required: true
      })])
    }));
    var api = new _Api.default(apiData.entrypoint, (0, _objectSpread2.default)({}, apiData, {
      resources: [resource]
    }));
    var render = (0, _enzyme.shallow)(_react.default.createElement(_List.default, {
      hasEdit: true,
      hasShow: true,
      options: {
        api: api,
        fieldFactory: defaultFieldFactory,
        parameterFactory: defaultParameterFactory,
        resource: resource
      },
      location: {},
      match: {},
      resource: ""
    }));
    expect(defaultFieldFactory).toHaveBeenCalledTimes(3);
    expect(render.find(_reactAdmin.TextField).length).toEqual(3);
    expect(render.find(_reactAdmin.TextField).get(0).props.source).toEqual('fieldA');
    expect(render.find(_reactAdmin.TextField).get(1).props.source).toEqual('fieldB');
    expect(render.find(_reactAdmin.TextField).get(2).props.source).toEqual('id');
  });
});