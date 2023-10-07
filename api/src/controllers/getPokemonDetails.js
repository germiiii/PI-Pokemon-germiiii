const { Pokemon } = require('../models/Pokemon');
const { Type } = require('../models/Type');

const getPokemonDetails = async (req, res) => {
  try {
    const idPokemon = req.params.idPokemon;

    // Find the pokemon by ID
    const pokemon = await Pokemon.findOne({
        where:{ id:idPokemon },
      include: Type, // Include the associated pokemon type
    });

    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getPokemonDetails };
