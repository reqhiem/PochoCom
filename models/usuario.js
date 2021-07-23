'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      //Para la tabla intermedia registro
      Usuario.belongsToMany(models.Edicion,{
        through: models.Registro
      })

      //Para la tabla intermedia concurso
      Usuario.belongsToMany(models.Actividad,{
        through: models.Concurso
      })

    }
  };
  Usuario.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    fotoPerfil: DataTypes.STRING,
    email: DataTypes.STRING,
    telefono: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isInvitado: DataTypes.BOOLEAN,
    universidad: DataTypes.STRING,
    carrera: DataTypes.STRING,
    grado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
    timestamps: false,
  });
  return Usuario;
};