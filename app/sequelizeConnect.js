const { Sequelize } = require('sequelize');
const config = require('./config');

module.exports = new Sequelize('auth_app', config.MYSQL_USER, config.MYSQL_PASSWORD, {
  dialect: 'mysql',
  host: 'mysql',
  port: '3306'
});
