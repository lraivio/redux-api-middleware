/**
 * Error class for an API response outside the 200 range
 *
 * @class ApiError
 * @access private
 * @param {number} status - the status code of the API response
 * @param {string} statusText - the status text of the API response
 * @param {Object} response - the JSON response of the API server if the 'Content-Type'
 *  header signals a JSON response, or the raw response object otherwise
 */
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApiError = (function (_Error) {
  _inherits(ApiError, _Error);

  function ApiError(status, statusText, response) {
    _classCallCheck(this, ApiError);

    _Error.call(this);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.message = status + ' - ' + statusText;
    this.response = response;
  }

  return ApiError;
})(Error);

exports['default'] = ApiError;
module.exports = exports['default'];