'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      this.belongsTo(models.Game, {
        foreignKey: 'gameId',
        as: 'game'
      });
    }
  };
  Bet.init({
    betNumber: DataTypes.INTEGER,
    amount: DataTypes.BIGINT,
    bettingTime: DataTypes.DATE,
    userId: {
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id'
    },
    gameId: {
      type: DataTypes.INTEGER,
      references: 'Games',
      referencesKey: 'id'
    },
    betStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bet',
  });
  return Bet;
};