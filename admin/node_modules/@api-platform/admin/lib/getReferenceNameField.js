"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * Gets the name of a field having the http://schema.org/name type or fallback to the id.
 *
 * @param {object} reference
 * @return {string}
 */
function _default(reference) {
  var field = reference.fields.find(function (field) {
    return 'http://schema.org/name' === field.id;
  });
  return field ? field.name : 'id';
}