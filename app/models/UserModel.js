const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeConnect');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { timestamps: false }
);

module.exports = User;
