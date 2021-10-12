const sequelize = require('../sequelizeConnect');
const UserModel = require('../models/UserModel');
const logger = require('../utils/logger');
const { messages } = require('../constants');

/**
 * DB Manager for User Model
 */
class UserManager {
  /**
   * Find one user
   *
   * @param {object} query - object with query params
   * @param {string} query.email - seeking user email
   * @returns {object} User
   * @example
   * const candidate = await UserManager.findOne({ email })
   */
  async findOne(query) {
    try {
      return await sequelize.transaction(async t => {
        return await UserModel.findOne({ where: query }, { transaction: t });
      });
    } catch (error) {
      logger.error(messages.technical.internalError('UserManager.findOne'), error);
      throw new Error(messages.userFriendly.internalError);
    }
  }

  async findById(id) {
    try {
      return await sequelize.transaction(async t => {
        return await UserModel.findByPk(id, { transaction: t });
      });
    } catch (error) {
      logger.error(messages.technical.internalError('UserManager.findById'), error);
      throw new Error(messages.userFriendly.internalError);
    }
  }

  /**
   * Create new user
   *
   * @param {object} data - object with user data
   * @param {string} data.email - user's email
   * @param {string} data.password - user's password
   * @returns {object} newly created user
   * @example
   * const user = await UserManager.create({ email, password })
   */
  async create(data) {
    try {
      return await sequelize.transaction(async t => {
        return await UserModel.create(data, { transaction: t });
      });
    } catch (error) {
      logger.error(messages.technical.internalError('UserManager.create'), error);
      throw new Error(messages.userFriendly.internalError);
    }
  }

  async findAll() {
    try {
      return await sequelize.transaction(async t => {
        return await UserModel.findAll({ transaction: t, lock: true });
      });
    } catch (error) {
      logger.error(messages.technical.internalError('UserManager.create'), error);
      throw new Error(messages.userFriendly.internalError);
    }
  }
}

module.exports = new UserManager();
