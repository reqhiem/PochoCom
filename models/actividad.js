'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actividad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Para la tabla concurso
      Actividad.belongsToMany(models.Usuario,{
        through: models.Concurso,
      })
      
      // Pára la tabla participacion
      Actividad.belongsToMany(models.Contribuidor,{
        through: models.Participacion,
      })

      //Para Edicion-Actividad
      Actividad.belongsTo(models.Edicion)
    }
  };
  Actividad.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE,
    enlaceReunion: DataTypes.STRING,
    isProtocolar: DataTypes.BOOLEAN,
    isPonencia: DataTypes.BOOLEAN,
    isPanel: DataTypes.BOOLEAN,
    topico: DataTypes.STRING,
    isConcurso: DataTypes.BOOLEAN,
    bases: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Actividad',
    timestamps: false,
  });
  return Actividad;
};