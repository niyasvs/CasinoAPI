'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Casino, {
        foreignKey: 'currentCasino',
        as: 'casino'
      });
    }
  };
  User.init({
    name: DataTypes.STRING,
    balanceAmount: { type: DataTypes.INTEGER, defaultValue: 0 },
    currentCasino: {
      type: DataTypes.INTEGER,
      references: 'Casinos',
      referencesKey: 'id'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};