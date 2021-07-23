'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Actividads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      fechaInicio: {
        type: Sequelize.DATE
      },
      fechaFin: {
        type: Sequelize.DATE
      },
      enlaceReunion: {
        type: Sequelize.STRING
      },
      edicionId: {
        type: Sequelize.INTEGER
      },
      isProtocolar: {
        type: Sequelize.BOOLEAN
      },
      isPonencia: {
        type: Sequelize.BOOLEAN
      },
      isPanel: {
        type: Sequelize.BOOLEAN
      },
      topico: {
        type: Sequelize.STRING
      },
      isConcurso: {
        type: Sequelize.BOOLEAN
      },
      bases: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Actividads');
  }
};