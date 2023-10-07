'use strict'; 
const { DataTypes, Model } = require('sequelize'); 
 
module.exports = (sequelize) => { 
  const PokemonType = sequelize.define('PokemonType', { 
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
    }, 
  }, { 
    modelName: 'PokemonType', 
  }); 
 
  PokemonType.associate = function(models) { 
    // Define associations here 
  }; 
 
  return PokemonType; 
};
