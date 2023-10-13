const express = require('express');
const pokemonRouter = require('./pokemonRouter')
const typeRouter = require('./typeRouter')
const app = express();

const mainRouter = express.Router();

// Import other routers if needed
// Example: const authRouter = require('./auth.js');

// Configure the routers
// Example: router.use('/auth', authRouter);
mainRouter.use(express.json());
mainRouter.use(express.urlencoded({extended: true}));

// Define the routes and call the controllers
mainRouter.use('/pokemon', pokemonRouter);
mainRouter.use('/type', typeRouter);

module.exports = mainRouter;
