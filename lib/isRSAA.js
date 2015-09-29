'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validateRSAA = require('./validateRSAA');

var _validateRSAA2 = _interopRequireDefault(_validateRSAA);

/**
 * Is the given action a Redux Standard API-calling action?
 *
 * @function isRSAA
 * @access public
 * @param {Object} action - The action to check against the RSAA definition.
 * @returns {boolean}
 */
function isRSAA(action) {
  return !_validateRSAA2['default'](action).length;
}

exports['default'] = isRSAA;
module.exports = exports['default'];