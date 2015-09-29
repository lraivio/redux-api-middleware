/**
 * Redux middleware for calling an API
 * @module apiMiddleware
 * @requires normalizr
 * @requires isomorphic-fetch
 * @exports {Symbol} CALL_API
 * @exports {function} isRSAA
 * @exports {ReduxMiddleWare} apiMiddleware
 */

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _CALL_API = require('./CALL_API');

var _CALL_API2 = _interopRequireDefault(_CALL_API);

var _validateRSAA = require('./validateRSAA');

var _validateRSAA2 = _interopRequireDefault(_validateRSAA);

var _isRSAA = require('./isRSAA');

var _isRSAA2 = _interopRequireDefault(_isRSAA);

var _apiMiddleware = require('./apiMiddleware');

var _apiMiddleware2 = _interopRequireDefault(_apiMiddleware);

exports.CALL_API = _CALL_API2['default'];
exports.validateRSAA = _validateRSAA2['default'];
exports.isRSAA = _isRSAA2['default'];
exports.apiMiddleware = _apiMiddleware2['default'];