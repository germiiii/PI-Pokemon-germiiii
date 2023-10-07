'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pokemons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      img: {
        type: Sequelize.BLOB,
        allowNull:false,
      },
      hp: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      atk: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      def: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      spd: {
        type: Sequelize.INTEGER
      },
      height: {
        type: Sequelize.DECIMAL
      },
      weight: {
        type: Sequelize.DECIMAL
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pokemons');
  }
};
