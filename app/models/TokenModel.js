const { Schema, model } = require('mongoose');

const TokenSchema = new Schema({
  refreshToken: {
    required: true,
    type: String
  },
  userId: {
    required: true,
    type: String
  }
});

module.exports = model('Token', TokenSchema);
