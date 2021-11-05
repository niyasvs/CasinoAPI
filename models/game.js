'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Casino, {
        foreignKey: 'casinoId',
        as: 'casino'
      });
    }
  };
  Game.init({
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    status: DataTypes.STRING,
    thrownNumber: DataTypes.INTEGER,
    casinoId: {
      type: DataTypes.INTEGER,
      references: 'Casinos',
      referencesKey: 'id'
    }
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};