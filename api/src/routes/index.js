const express = require('express');
const { Router } = require('express');
const getPokemon = require('../controllers/getPokemon');


const mainRouter = Router();

// Import other routers if needed
// Example: const authRouter = require('./auth.js');

// Configure the routers
// Example: router.use('/auth', authRouter);

// Define the routes and call the controllers
mainRouter.get('/', getPokemon);
mainRouter.get('/:id', getPokemon);

module.exports = mainRouter;
