'use strict'; 
const { DataTypes } = require('sequelize'); 
 
module.exports = (sequelize) => { 
  const Pokemon = sequelize.define('Pokemon', { 
    name: { 
      type: DataTypes.STRING, 
      allowNull: false, 
    }, 
    img: { 
      type: DataTypes.BLOB, 
      allowNull: false, 
    }, 
    hp: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
    }, 
    atk: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
    }, 
    def: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
    }, 
    spd: { 
      type: DataTypes.INTEGER, 
    }, 
    height: { 
      type: DataTypes.DECIMAL, 
    }, 
    weight: { 
      type: DataTypes.DECIMAL, 
    }, 
  }, { 
    modelName: 'Pokemon', 
  }); 
 
  Pokemon.associate = function(models) { 
    // Define associations here 
  }; 
 
  return Pokemon; 
};
