const express = require('express');
const { getPokemonHandler, getPokemonsHandler, createPokemonHandler } = require('../handlers/pokemonHandlers');

const pokemonRouter = express.Router();

pokemonRouter.get('/names', getPokemonsHandler);
pokemonRouter.get('/name', getPokemonsHandler);
pokemonRouter.get('/', getPokemonsHandler);
pokemonRouter.get('/:id', getPokemonHandler);
pokemonRouter.post('/', createPokemonHandler);

module.exports = pokemonRouter;
