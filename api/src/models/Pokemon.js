const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img:{
      type: DataTypes.BLOB,
      allowNull: false,
    },
    hp:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    atk:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    def:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spd:{
      type: DataTypes.INTEGER,
    },
    height:{
      type: DataTypes.DECIMAL,
    },
    wheigth:{
      type: DataTypes.DECIMAL,
    }

  });
};
