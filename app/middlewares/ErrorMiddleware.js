const logger = require('../utils/logger');
const ApiError = require('../exceptions/ApiError');
const { messages } = require('../constants');

module.exports = function (err, req, res) {
  logger.error(err.message);

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: messages.userFriendly.internalError });
};
