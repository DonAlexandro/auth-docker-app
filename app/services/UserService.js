const bcrypt = require('bcrypt');

const UserManager = require('../managers/UserManager');
const TokenService = require('./TokenService');
const UserDto = require('../dto/UserDto');
const ApiError = require('../exceptions/ApiError');
const { messages } = require('../constants');
const TokenModel = require('../models/TokenModel');

/**
 * Service is being used for manipulations with users (signup, login etc.)
 */
class UserService {
  /**
   * Create new user
   *
   * @param {string} email - expected user's email
   * @param {string} password - expected user's password
   */
  async signup(email, password) {
    const candidate = await UserManager.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(messages.userFriendly.emailExists(email));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserManager.create({ email, password: hashedPassword });

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(email, password) {
    const user = await UserManager.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest(messages.userFriendly.userNotFound(email));
    }

    const isSame = await bcrypt.compare(password, user.password);

    if (!isSame) {
      throw ApiError.BadRequest(messages.userFriendly.invalidCredentials);
    }

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    return TokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await TokenModel.findOne({ refreshToken });

    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserManager.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();
