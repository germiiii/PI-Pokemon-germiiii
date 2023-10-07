'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Type = sequelize.define('Type', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  });

  return Type;
};
