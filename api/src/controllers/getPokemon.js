const { Router } = require('express');
const axios = require('axios');
const { Op } = require('sequelize');
const { Pokemon, Type} = require('../db');
const {cleanArray, cleanDb} = require('../helpers/clean')

const getAllPokemons = async (offset, limit) => {
  try {
    const dbPokemons = await Pokemon.findAll({ include: {model:Type, attributes: ['id','name']}});
    
    const formattedPokemons = cleanDb(dbPokemons)

    // Hacemos la peticion a la API con los parametros offset y limit
    const apiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
    const apiPokemonsRAW = apiResponse.data.results;

    // Separamos la peticion de la api por cada pokemon para obtener las stats
    const apiPokemonsPromises = apiPokemonsRAW.map(pokemon => axios.get(pokemon.url));
    const apiPokemonsResponses = await Promise.all(apiPokemonsPromises);

    // Extraemos la data de la response
    const apiPokemonsData = apiPokemonsResponses.map(response => response.data);

    // Limpiamos
    const apiPokemons = cleanArray(apiPokemonsData);
    
    const allPokemons = [...formattedPokemons,...apiPokemons]

    return allPokemons;
  } catch (error) {
    res.status(501).json({error:'hace las cosas bien '});
  }
};


const getPokemonById = async (id, source) => {
  const pokemon = source === 'api'
  ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data 
  : await Pokemon.findByPk(id, {include:Type});

  return cleanArray([pokemon])
};

const createPokemon = async (name, image, hp, attack, defense, speed, height, weight, types) => {
  // Perform a lookup to find the type IDs for the specified type names.
  const typeIds = [];

  for (const typeName of types) {
    const type = await Type.findOne({
      where: { name: typeName },
    });

    if (!type) {
      throw new Error(`Type "${typeName}" not found.`);
    }

    typeIds.push(type.id);
  }
  const newPokemon = await Pokemon.create({
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
  });

  // Associate the Pokémon with the found types.
  await newPokemon.setTypes(typeIds);
  return newPokemon;
};

const searchPokemonByNames = async (req, res) => {
  try {
    const {name, language = 'en'} = req.params;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing name parameter' });
    }
    const lowerCaseName = name.toLowerCase();
    const databasePokemons = await Pokemon.findAll({
      where: {
        name: {
          [Op.iLike]: `%${lowerCaseName}%`,
        },
      },
      include: Type,
    });

    const apiPokemonsResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1100`);
    const apiPokemonsRAW = apiPokemonsResponse.data.results;
    const apiPokemonsPromises = apiPokemonsRAW
      .filter((pokemon) => pokemon.name.includes(lowerCaseName))
      .map(async (pokemon) => {
        const response = await axios.get(pokemon.url); // Make a single request for each matching Pokemon
        return response.data; // Return the data from the response
      });

    const apiPokemonsData = await Promise.all(apiPokemonsPromises);

    // Clean the data from both sources
    const dbPoke = cleanDb(databasePokemons);
    const apiPoke = cleanArray(apiPokemonsData);

    // Combine the results from the database and API
    const allMatches = [...dbPoke, ...apiPoke];

    return allMatches;
  } catch (error) {
    res.status(400).json({ error: 'Failed to search for Pokémon' });
  }
};

const deletePokemonByName = async (name) => {
  try {
    // Assuming you're using Sequelize, you can delete the Pokémon by its ID.
    await Pokemon.destroy({
      where: {
        name: name,
      },
    });
  } catch (error) {
    throw new Error('Failed to delete the Pokémon');
  }
};


module.exports = {
  getAllPokemons,
  getPokemonById,
  createPokemon,
  searchPokemonByNames,
  deletePokemonByName
};
