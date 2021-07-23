'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Participacion.init({
    rol: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Participacion',
    timestamps: false,
  });
  return Participacion;
};