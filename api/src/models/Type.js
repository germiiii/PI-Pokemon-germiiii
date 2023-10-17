const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "type",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false, 
      },
      name: {
        type: DataTypes.ENUM("Normal", "Figthting", 'Flying', 'Poison' , 'Ground' , 'Rock' , 'Bug', 'Ghost', 'Steel', 'Fire' , 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark' , 'Fairy', 'Unknown', 'Shadow'),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
