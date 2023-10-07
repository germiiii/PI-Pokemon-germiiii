const { Pokemon } = require('../models/Pokemon');

const getAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.findAll();
    res.json(pokemons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllPokemons };
