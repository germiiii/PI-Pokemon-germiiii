const express = require('express');
const pokemonRouter = require('./pokemonRouter')
const typeRouter = require('./typeRouter')

const mainRouter = express.Router();

// Import other routers if needed
// Example: const authRouter = require('./auth.js');
const loggerMiddleware = (req, res, next) => {
    console.log('Request received');
    next();
  };
// Configure the routers
// Example: router.use('/auth', authRouter);
mainRouter.use(loggerMiddleware);

// Define the routes and call the controllers
mainRouter.use('/pokemon', pokemonRouter);
mainRouter.use('/type', typeRouter);

module.exports = mainRouter;
