'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dealer extends Model {
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
  Dealer.init({
    name: DataTypes.STRING,
    casinoId: {
      type: DataTypes.INTEGER,
      references: 'Casinos',
      referencesKey: 'id'
    }
  }, {
    sequelize,
    modelName: 'Dealer',
  });
  return Dealer;
};