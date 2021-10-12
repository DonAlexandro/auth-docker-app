const UserService = require('../services/UserService');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/ApiError');
const { messages } = require('../constants');
const UserManager = require('../managers/UserManager');

/**
 * Layer between router and user service
 */
class UserController {
  async signup(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest(messages.userFriendly.invalidCredentials, errors.array()));
      }

      const { email, password } = req.body;
      const userData = await UserService.signup(email, password);

      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      res.cookie('refreshToken', userData.refreshToken, { maxAge: thirtyDays, httpOnly: true });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);

      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      res.cookie('refreshToken', userData.refreshToken, { maxAge: thirtyDays, httpOnly: true });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie('refreshToken');

      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.refresh(refreshToken);
      res.clearCookie('refreshToken');

      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await UserManager.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
