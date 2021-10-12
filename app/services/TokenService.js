const jwt = require('jsonwebtoken');

const config = require('../config');
const TokenModel = require('../models/TokenModel');

/**
 * Service is being used for manipulations with tokens (generation)
 */
class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn: '30s' });
    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, config.JWT_ACCESS_SECRET);
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, config.JWT_REFRESH_SECRET);
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return tokenData.save();
    }

    const token = await TokenModel.create({ userId, refreshToken });

    return token;
  }

  async removeToken(refreshToken) {
    return await TokenModel.deleteOne({ refreshToken });
  }
}

module.exports = new TokenService();
