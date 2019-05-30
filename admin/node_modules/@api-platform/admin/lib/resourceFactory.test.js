"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactAdmin = require("react-admin");

var _resourceFactory = _interopRequireDefault(require("./resourceFactory"));

describe('makes Resource component', function () {
  var resource = {
    name: 'name',
    props: {
      custom: 'props'
    }
  };
  var api = {
    name: 'api'
  };
  var fieldFactory = jest.fn();
  var inputFactory = jest.fn();
  var parameterFactory = jest.fn();
  describe('makes default Resource component', function () {
    var resourceComponent = (0, _resourceFactory.default)(resource, api, fieldFactory, inputFactory, parameterFactory);
    test('is Resource component', function () {
      expect(resourceComponent.type.prototype).toEqual(_reactAdmin.Resource.prototype);
    });
    test('have props defined', function () {
      expect(resourceComponent.props).toBeDefined();
    });
    test('have proper name prop set', function () {
      expect(resourceComponent.props.name).toEqual(resource.name);
    });
    test('have proper icon prop set', function () {
      expect(resourceComponent.props.icon).toEqual(resource.icon);
    });
    test('have default actions: create, edit, list, show set', function () {
      expect(resourceComponent.props.create).toBeInstanceOf(Function);
      expect(resourceComponent.props.edit).toBeInstanceOf(Function);
      expect(resourceComponent.props.list).toBeInstanceOf(Function);
      expect(resourceComponent.props.show).toBeInstanceOf(Function);
    });
    test('have proper custom props set', function () {
      Object.keys(resource.props).forEach(function (key) {
        expect(resourceComponent.props[key]).toEqual(resource.props[key]);
      });
    });
    test('have proper options prop set', function () {
      expect(resourceComponent.props.options).toEqual({
        api: api,
        fieldFactory: fieldFactory,
        inputFactory: inputFactory,
        parameterFactory: parameterFactory,
        resource: resource
      });
    });
  });
  describe('makes Resource component with custom actions', function () {
    test('have custom create action', function () {
      var customCreate = jest.fn();
      var resourceComponent = (0, _resourceFactory.default)(Object.assign({}, resource, {
        create: customCreate
      }), api, fieldFactory, inputFactory);
      expect(resourceComponent.props.create).toEqual(customCreate);
    });
    test('have custom create action', function () {
      var customCreate = jest.fn();
      var resourceComponent = (0, _resourceFactory.default)(Object.assign({}, resource, {
        create: customCreate
      }), api, fieldFactory, inputFactory, parameterFactory);
      expect(resourceComponent.props.create).toEqual(customCreate);
    });
    test('have custom icon action', function () {
      var customIcon = jest.fn();
      var resourceComponent = (0, _resourceFactory.default)(Object.assign({}, resource, {
        icon: customIcon
      }), api, fieldFactory, inputFactory, parameterFactory);
      expect(resourceComponent.props.icon).toEqual(customIcon);
    });
    test('have custom list action', function () {
      var customList = jest.fn();
      var resourceComponent = (0, _resourceFactory.default)(Object.assign({}, resource, {
        list: customList
      }), api, fieldFactory, inputFactory, parameterFactory);
      expect(resourceComponent.props.list).toEqual(customList);
    });
    test('have custom show action', function () {
      var customShow = jest.fn();
      var resourceComponent = (0, _resourceFactory.default)(Object.assign({}, resource, {
        show: customShow
      }), api, fieldFactory, inputFactory, parameterFactory);
      expect(resourceComponent.props.show).toEqual(customShow);
    });
    test('have custom edit action', function () {
      var customEdit = jest.fn();
      var resourceComponent = (0, _resourceFactory.default)(Object.assign({}, resource, {
        edit: customEdit
      }), api, fieldFactory, inputFactory, parameterFactory);
      expect(resourceComponent.props.edit).toEqual(customEdit);
    });
  });
});