"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _parseHydraDocumentation = _interopRequireDefault(require("@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _AdminBuilder = _interopRequireDefault(require("../AdminBuilder"));

var _hydraClient = _interopRequireDefault(require("./hydraClient"));

var _default =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(_default, _Component);

  function _default() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, _default);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(_default)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      api: null,
      customRoutes: [],
      hasError: false,
      loaded: false
    });
    return _this;
  }

  (0, _createClass2.default)(_default, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.apiDocumentationParser(this.props.entrypoint).then(function (_ref) {
        var api = _ref.api,
            _ref$customRoutes = _ref.customRoutes,
            customRoutes = _ref$customRoutes === void 0 ? [] : _ref$customRoutes;
        return {
          api: api,
          customRoutes: customRoutes,
          hasError: false,
          loaded: true
        };
      }, function (data) {
        if (data instanceof Error) {
          console.error(data);
          return {
            hasError: true,
            loaded: true
          };
        }

        return {
          api: data.api,
          customRoutes: data.customRoutes,
          hasError: true,
          loaded: true
        };
      }).then(this.setState.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      if (false === this.state.loaded) {
        return 'function' === typeof this.props.loading ? _react.default.createElement(this.props.loading, null) : _react.default.createElement("span", {
          className: "loading"
        }, this.props.loading);
      }

      if (true === this.state.hasError) {
        return 'function' === typeof this.props.error ? _react.default.createElement(this.props.error, null) : _react.default.createElement("span", {
          className: "error"
        }, this.props.error);
      }

      return _react.default.createElement(_AdminBuilder.default, (0, _extends2.default)({}, this.props, {
        api: this.state.api,
        customRoutes: this.props.customRoutes.concat(this.state.customRoutes),
        dataProvider: this.props.dataProvider(this.state.api)
      }));
    }
  }]);
  return _default;
}(_react.Component);

exports.default = _default;
(0, _defineProperty2.default)(_default, "defaultProps", {
  apiDocumentationParser: _parseHydraDocumentation.default,
  customRoutes: [],
  error: 'Unable to retrieve API documentation.',
  loading: 'Loading...',
  dataProvider: _hydraClient.default
});
(0, _defineProperty2.default)(_default, "propTypes", {
  apiDocumentationParser: _propTypes.default.func,
  customRoutes: _propTypes.default.array,
  entrypoint: _propTypes.default.string.isRequired,
  error: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string]),
  loading: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string]),
  dataProvider: _propTypes.default.func
});