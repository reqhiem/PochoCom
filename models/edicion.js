'use strict';
const {Model} = require('sequelize'); 

module.exports = (sequelize, DataTypes) => {
  class Edicion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Edicion.belongsToMany(models.Usuario,{
        through: models.Registro
      })

      //Edicion-actividad
      Edicion.hasMany(models.Actividad)
    }
  };
  Edicion.init({
    anio: DataTypes.STRING,
    nombre: DataTypes.STRING,
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Edicion',
    timestamps: false,
  });
  return Edicion;
};