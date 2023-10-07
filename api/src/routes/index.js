const express = require('express');
const { Router } = require('express');
const { getAllPokemons } = require('../controllers/getAllPokemons');
const { getPokemonDetails } = require('../controllers/getPokemonDetails');
const router = Router();

// Import other routers if needed
// Example: const authRouter = require('./auth.js');

// Configure the routers
// Example: router.use('/auth', authRouter);

// Define the routes and call the controllers
router.get('/pokemons', getAllPokemons);
router.get('/pokemons/:idPokemon', getPokemonDetails);

module.exports = router;
