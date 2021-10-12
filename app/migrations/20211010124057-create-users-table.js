module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return queryInterface.createTable(
        'Users',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
          },
          email: { type: Sequelize.DataTypes.STRING, allowNull: false, unique: true },
          password: { type: Sequelize.DataTypes.STRING, allowNull: false }
        },
        { transaction: t }
      );
    });
  },

  down: async queryInterface => {
    return queryInterface.sequelize.transaction(t => {
      return queryInterface.dropTable('Users', { transaction: t });
    });
  }
};
