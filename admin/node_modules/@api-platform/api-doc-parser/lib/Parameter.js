"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @property {string} variable - The variable of this field
 */
var Parameter =

/**
 * @param {string} variable
 * @param {string} range
 * @param {boolean} required
 * @param {string} description
 */
function Parameter(variable, range, required, description) {
  (0, _classCallCheck3.default)(this, Parameter);

  this.variable = variable;
  this.range = range;
  this.required = required;
  this.description = description;
};

exports.default = Parameter;