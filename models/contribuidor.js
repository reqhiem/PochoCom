'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contribuidor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Para la table participacion
      Contribuidor.belongsToMany(models.Actividad,{
        through: models.Participacion,
      })

      //Para las redes sociales
      Contribuidor.hasMany(models.Social)
    }
  };
  Contribuidor.init({
    nombre: DataTypes.STRING,
    apellPaterno: DataTypes.STRING,
    apellMaterno: DataTypes.STRING,
    especialidad: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contribuidor',
    timestamps: false,
  });
  return Contribuidor;
};