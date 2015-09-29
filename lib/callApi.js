'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _humps = require('humps');

var _normalizr = require('normalizr');

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _ApiError = require('./ApiError');

var _ApiError2 = _interopRequireDefault(_ApiError);

/**
 * Fetches an API response and normalizes the resulting JSON according to schema.
 *
 * @function callApi
 * @access private
 * @param {string} endpoint - The URL endpoint for the request
 * @param {string} method - The HTTP method for the request
 * @param {boolean} [auth=false] - Whether to send authentication credentials or not
 * @param {Object} [body] - The body of the request
 * @param {Schema} [schema] - The normalizr schema with which to parse the response
 * @returns {Promise}
 */
function callApi(endpoint, method, headers, body, schema) {
  var requestOptions = { method: method, body: body, headers: headers };

  return _isomorphicFetch2['default'](endpoint, requestOptions).then(function (response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  }).then(function (response) {
    var contentType = response.headers.get('Content-Type');
    if (contentType && ~contentType.indexOf('json')) {
      return response.json().then(function (json) {
        var camelizedJson = _humps.camelizeKeys(json);
        if (schema) {
          return Promise.resolve(_normalizr.normalize(camelizedJson, schema));
        } else {
          return Promise.resolve(camelizedJson);
        }
      });
    } else {
      return Promise.resolve();
    }
  }, function (response) {
    var contentType = response.headers.get('Content-Type');
    if (contentType && ~contentType.indexOf('json')) {
      return response.json().then(function (json) {
        return Promise.reject(new _ApiError2['default'](response.status, response.statusText, json));
      });
    } else {
      return Promise.reject(new _ApiError2['default'](response.status, response.statusText, response));
    }
  });
}

exports['default'] = callApi;
module.exports = exports['default'];