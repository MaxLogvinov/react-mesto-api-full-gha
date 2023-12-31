const httpConstants = require('http2').constants;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = httpConstants.HTTP_STATUS_NOT_FOUND;
    this.name = 'Not Found';
  }
}

module.exports = NotFoundError;
