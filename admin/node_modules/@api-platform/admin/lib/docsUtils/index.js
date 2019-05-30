"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResource = getResource;
exports.getResourceField = getResourceField;
exports.replaceInput = replaceInput;
exports.replaceField = replaceField;
exports.replaceResource = replaceResource;
exports.replaceResources = replaceResources;

function getResource(resources, resourceName) {
  return resources.find(function (_ref) {
    var name = _ref.name;
    return resourceName === name;
  });
}

function getResourceField(resource, resourceFieldName) {
  return resource.fields.find(function (_ref2) {
    var name = _ref2.name;
    return resourceFieldName === name;
  });
}

function replaceInput(resource, resourceFieldName, replaceInput) {
  var resourceField = getResourceField(resource, resourceFieldName);
  if (undefined === resourceField) return;
  resourceField.input = replaceInput;
}

function replaceField(resource, resourceFieldName, replaceField) {
  var resourceField = getResourceField(resource, resourceFieldName);
  if (undefined === resourceField) return;
  resourceField.field = replaceField;
}

function replaceResource(resources, replaceResource) {
  var resource = getResource(resources, replaceResource.name);

  if (undefined !== replaceResource.listFields) {
    resource.listFields = replaceResource.listFields;
  }

  if (undefined !== replaceResource.fields) {
    replaceResource.fields.forEach(function (resourceField) {
      if (resourceField.field) {
        replaceField(resource, resourceField.name, resourceField.field);
      }

      if (resourceField.input) {
        replaceInput(resource, resourceField.name, resourceField.input);
      }
    });
  }

  if (undefined !== replaceResource.list) {
    resource.list = replaceResource.list;
  }

  if (undefined !== replaceResource.create) {
    resource.create = replaceResource.create;
  }

  if (undefined !== replaceResource.edit) {
    resource.edit = replaceResource.edit;
  }
}

function replaceResources(resources, replaceResources) {
  replaceResources.forEach(function (resource) {
    replaceResource(resources, resource);
  });
}