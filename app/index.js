require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const config = require('./config');
const router = require('./router');
const sequelize = require('./sequelizeConnect');
const logger = require('./utils/logger');
const errorMiddleware = require('./middlewares/ErrorMiddleware');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);
app.use(errorMiddleware);

/**
 * Recursively try to connect to MongoDB
 */
const connectToMongo = async () => {
  const MONGO_URI = `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_IP}:${config.MONGO_PORT}/?authSource=admin`;

  try {
    await mongoose.connect(MONGO_URI);
    logger.info('Successfully connected to MongoDB!');
  } catch (error) {
    logger.error('Unable to connect to the MongoDB:', error);
    setTimeout(connectToMongo, 5000);
  }
};

/**
 * Recursively try to connect to MySQL
 */
const connectToMysql = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Successfully connected to MySQL!');
  } catch (error) {
    logger.error('Unable to connect to the MySQL:', error);
    setTimeout(connectToMysql, 5000);
  }
};

/**
 * Start the whole server
 */
function start() {
  connectToMysql();
  connectToMongo();
  app.listen(config.PORT, () => logger.info(`Server is running on port ${config.PORT}`));
}

start();
