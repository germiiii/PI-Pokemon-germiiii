const express = require('express');
const { getPokemonHandler, getPokemonsHandler, createPokemonHandler } = require('../handlers/pokemonHandlers');

const pokemonRouter = express.Router();

pokemonRouter.get('/names', getPokemonsHandler);
pokemonRouter.get('/name/:name', getPokemonsHandler);
pokemonRouter.get('/', getPokemonsHandler);
pokemonRouter.get('/id/:id', getPokemonHandler);
pokemonRouter.post('/', createPokemonHandler);

module.exports = pokemonRouter;
