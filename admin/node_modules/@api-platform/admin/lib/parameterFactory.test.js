"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactAdmin = require("react-admin");

var _parameterFactory = _interopRequireDefault(require("./parameterFactory"));

function mockParameter(range) {
  var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'defaultValue';
  return {
    range: 'http://www.w3.org/2001/XMLSchema#' + range,
    variable: variable
  };
}

describe('generate parameters input component', function () {
  var options = {
    option1: 'some_option'
  };

  function expectResultOfType(result, type) {
    expect(result.type.prototype).toEqual(type.prototype);
  }

  function expectResultToHaveOptionsPropsAndParameterVariable(result, parameter, options) {
    var props = result.props;
    Object.keys(options).forEach(function (key) {
      expect(props).toHaveProperty(key, options[key]);
    });
    expect(props).toHaveProperty('source', parameter.variable);
  }

  describe('generate parameter input component based on parameter range', function () {
    var rangeToComponentType = {
      string: _reactAdmin.TextInput,
      integer: _reactAdmin.NumberInput,
      float: _reactAdmin.NumberInput,
      boolean: _reactAdmin.NullableBooleanInput,
      dateTime: _reactAdmin.DateInput
    };
    Object.keys(rangeToComponentType).forEach(function (range) {
      describe("generate parameter input component for parameter with range '" + range + "'", function () {
        var parameter;
        var result;
        beforeEach(function () {
          parameter = mockParameter(range);
          result = (0, _parameterFactory.default)(parameter, options);
        });
        test('generated input component is instance of', function () {
          var expectedComponentType = rangeToComponentType[range];
          expectResultOfType(result, expectedComponentType);
        });
        test('generated input component has options passed as props', function () {
          expectResultToHaveOptionsPropsAndParameterVariable(result, parameter, options);
        });
      });
    });
  });
  test("TODO: generate parameter input component for parameter with variable 'between'", function () {
    var result = (0, _parameterFactory.default)(mockParameter(null, 'someVariable[between]'), options); // Generation of input component is not implemented yet for parameter with variable 'between'

    expect(result).toBeNull();
  });
  describe('generate parameter input component for option apiPlatform false', function () {
    beforeEach(function () {
      options.apiPlatform = false;
    });
    test("generate parameter input component for parameter with variable ending with square brackets if 'apiPlatform' is set to false", function () {
      var parameter = mockParameter('string', 'someVariable[]');
      var result = (0, _parameterFactory.default)(parameter, options);
      expectResultOfType(result, _reactAdmin.TextInput);
      expectResultToHaveOptionsPropsAndParameterVariable(result, parameter, options);
    });
    test("generate parameter input component for parameter with variable ending with 'order[xxx]' if 'apiPlatform' is set to false", function () {
      var parameter = mockParameter('string', 'order[yyyy]');
      var result = (0, _parameterFactory.default)(parameter, options);
      expectResultOfType(result, _reactAdmin.TextInput);
      expectResultToHaveOptionsPropsAndParameterVariable(result, parameter, options);
    });
  });
});