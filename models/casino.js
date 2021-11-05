'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Casino extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Casino.init({
    name: DataTypes.STRING,
    balanceAmount: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    sequelize,
    modelName: 'Casino',
  });
  return Casino;
};