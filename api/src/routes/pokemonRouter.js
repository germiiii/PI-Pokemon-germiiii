const express = require('express');
const { getPokemonHandler, getPokemonsHandler, createPokemonHandler, searchPokemonByNameHandler, deletePokemonHandler } = require('../handlers/pokemonHandlers');

const pokemonRouter = express.Router();

pokemonRouter.get('/names/:name', searchPokemonByNameHandler);
pokemonRouter.get('/', getPokemonsHandler);
pokemonRouter.get('/:id', getPokemonHandler);
pokemonRouter.delete('/:name', deletePokemonHandler);
pokemonRouter.post('/', createPokemonHandler);

module.exports = pokemonRouter;
