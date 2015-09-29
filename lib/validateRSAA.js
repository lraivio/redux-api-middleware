'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _CALL_API = require('./CALL_API');

var _CALL_API2 = _interopRequireDefault(_CALL_API);

var _normalizr = require('normalizr');

var _lodashIsplainobject = require('lodash.isplainobject');

var _lodashIsplainobject2 = _interopRequireDefault(_lodashIsplainobject);

/**
 * Checks an action against the RSAA definition, returning a (possibly empty)
 * array of validation errors.
 *
 * @function validateRSAA
 * @access public
 * @param {Object} action - The action to check against the RSAA definition.
 * @returns {Array}
 */
function validateRSAA(action) {
  var validationErrors = [];
  var validRootKeys = [[_CALL_API2['default']], 'payload', 'meta'];
  var validCallAPIKeys = ['endpoint', 'method', 'types', 'body', 'headers', 'schema', 'bailout'];
  var validMethods = ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

  if (!_lodashIsplainobject2['default'](action)) {
    validationErrors.push('RSAA must be a plain JavaScript object');
    return validationErrors;
  }

  var callAPI = action[_CALL_API2['default']];
  if (typeof callAPI === 'undefined') {
    validationErrors.push('Missing [CALL_API] key');
    return validationErrors;
  }
  for (var key in action) {
    if (! ~validRootKeys.indexOf(key)) {
      validationErrors.push('Invalid root key: ' + key);
    }
    if (validationErrors.length) {
      return validationErrors;
    }
  }
  if (!_lodashIsplainobject2['default'](callAPI)) {
    validationErrors.push('[CALL_API] property must be a plain JavaScript object');
    return validationErrors;
  }
  for (var key in callAPI) {
    if (! ~validCallAPIKeys.indexOf(key)) {
      validationErrors.push('Invalid [CALL_API] key: ' + key);
    }
    if (validationErrors.length) {
      return validationErrors;
    }
  }

  var endpoint = callAPI.endpoint;
  var method = callAPI.method;
  var body = callAPI.body;
  var headers = callAPI.headers;
  var schema = callAPI.schema;
  var types = callAPI.types;
  var bailout = callAPI.bailout;

  if (typeof endpoint !== 'string' && typeof endpoint !== 'function') {
    validationErrors.push('[CALL_API].endpoint property must be a string or a function');
  }
  if (typeof method !== 'string') {
    validationErrors.push('[CALL_API].method property must be a string');
  } else if (! ~validMethods.indexOf(method.toUpperCase())) {
    validationErrors.push('Invalid [CALL_API].method: ' + method.toUpperCase());
  }
  if (!Array.isArray(types) || types.length !== 3) {
    validationErrors.push('[CALL_API].types property must be an array of length 3');
  }
  if (typeof headers !== 'undefined' && !_lodashIsplainobject2['default'](headers)) {
    validationErrors.push('[CALL_API].headers property must be undefined, or a plain JavaScript object');
  }
  if (typeof schema !== 'undefined' && !(schema instanceof _normalizr.Schema) && !schema.hasOwnProperty('_itemSchema')) {
    validationErrors.push('[CALL_API].schema property must be undefined, a normalizr schema, or an arrayOf thereof');
  }
  if (typeof bailout !== 'undefined' && typeof bailout !== 'boolean' && typeof bailout !== 'function') {
    validationErrors.push('[CALL_API].bailout property must be undefined, a boolean, or a function');
  };
  return validationErrors;
}

exports['default'] = validateRSAA;
module.exports = exports['default'];