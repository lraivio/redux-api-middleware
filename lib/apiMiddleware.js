'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _CALL_API = require('./CALL_API');

var _CALL_API2 = _interopRequireDefault(_CALL_API);

var _isRSAA = require('./isRSAA');

var _isRSAA2 = _interopRequireDefault(_isRSAA);

var _callApi = require('./callApi');

var _callApi2 = _interopRequireDefault(_callApi);

/**
 * @typedef {function} ReduxMiddleware
 * @param {Object} store
 * @returns {ReduxNextHandler}
 *
 * @typedef {function} ReduxNextHandler
 * @param {function} next
 * @returns {ReduxActionHandler}
 *
 * @typedef {function} ReduxActionHandler
 * @param {object} action
 * @returns undefined
 */

/**
 * A Redux middleware that interprets actions with CALL_API info specified.
 * Performs the call and promises when such actions are dispatched.
 *
 * @type {ReduxMiddleware}
 * @access public
 */
function apiMiddleware(_ref) {
  var getState = _ref.getState;

  return function (next) {
    return function (action) {
      var callAPI = action[_CALL_API2['default']];
      if (!_isRSAA2['default'](action)) {
        return next(action);
      }

      var endpoint = callAPI.endpoint;
      var method = callAPI.method;
      var body = callAPI.body;
      var headers = callAPI.headers;
      var schema = callAPI.schema;
      var types = callAPI.types;
      var bailout = callAPI.bailout;

      if (typeof endpoint === 'function') {
        endpoint = endpoint(getState());
      }
      if (typeof bailout === 'boolean' && bailout || typeof bailout === 'function' && bailout(getState())) {
        return Promise.resolve('Bailing out');
      }

      function actionWith(data, payload) {
        var finalPayload = _extends({}, action.payload, payload);
        var finalAction = _extends({}, action, { payload: finalPayload }, data);
        delete finalAction[_CALL_API2['default']];
        return finalAction;
      }

      var requestType = types[0];
      var successType = types[1];
      var failureType = types[2];

      next(actionWith({ type: requestType }));

      return _callApi2['default'](endpoint, method, headers, body, schema).then(function (response) {
        return next(actionWith({ type: successType }, response));
      }, function (error) {
        return next(actionWith({
          type: failureType,
          payload: error,
          error: true
        }));
      });
    };
  };
}

exports['default'] = apiMiddleware;
module.exports = exports['default'];