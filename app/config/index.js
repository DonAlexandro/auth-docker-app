module.exports = {
  MONGO_IP: process.env.MONGO_IP || 'mongo',
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  PORT: process.env.PORT || 5000,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  MONGO_USER: process.env.MONGO_INITDB_ROOT_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
  PORT: process.env.PORT,
  MYSQL_USER: process.env.MYSQL_ROOT_USERNAME,
  MYSQL_PASSWORD: process.env.MYSQL_ROOT_PASSWORD
};
