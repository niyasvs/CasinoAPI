'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      betNumber: {
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.BIGINT
      },
      bettingTime: {
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      gameId: {
        type: Sequelize.INTEGER,
        references: { model: 'Games', key: 'id' }
      },
      betStatus: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bets');
  }
};