var _ = require('underscore');

var ObjectPath = {};

/**
 * Return the value of a nested object property from it path.
 *
 * Usages:
 * - ObjectPath.getPath(document.body, 'style.width')
 * - ObjectPath.getPath(someObject, 'part3.0.size')
 * - ObjectPath.getPath({}, 'properties.that.do.not.exist') === undefined
 *
 * @param obj {Object} An object
 * @param path {String} The path of the nested property to get.
 * @return {*} The value of the nested property or undefined if the property doesn't exist.
 */
ObjectPath.getPath = function (obj, path) {
  return path.split('.').reduce(function (prev, curr) {
    return prev ? prev[curr] : undefined;
  }, obj);
};

/**
 * Set the value of a nested object property.
 *
 * Usages:
 * - ObjectPath.setPath({}, 'a.nested.prop', 'myValue') === { a: { nested: { prop: 'myValue' } } }
 *
 * @param obj {Object}
 * @param path {String}
 * @param value {*}
 * @param options {Object}
 * @returns {Object} The object passed as input parameter set with the nested property.
 */
ObjectPath.setPath = function (obj, path, value, options = {}) {
  options = _.extend({
    deleteEmptyString: false,
    nullEmptyString: false,
    undefinedEmptyString: false,
  }, options);
  path = (typeof path === 'string') ? path.split('.') : path;

  const firstSegment = path.shift();

  if (path.length === 0) {
    // Stop condition
    if (value === '') {
      if (options.deleteEmptyString) {
        delete obj[firstSegment];
      } else if (options.nullEmptyString) {
        obj[firstSegment] = null;
      } else if (options.undefinedEmptyString) {
        obj[firstSegment] = undefined;
      }
    } else {
      obj[firstSegment] = value;
    }
  } else {
    // Progress condition
    obj[firstSegment] = ObjectPath.setPath(
        (typeof obj[firstSegment] === 'object' ? obj[firstSegment] : {}),
        path,
        value,
        options,
    );
  }

  return obj;
};

module.exports = {
  getPath: ObjectPath.getPath,
  setPath: ObjectPath.setPath,
};
