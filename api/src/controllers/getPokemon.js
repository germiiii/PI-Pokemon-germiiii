const { Router } = require('express');
const axios = require('axios');
const { Op } = require('sequelize');

const { Pokemon } = require('../db');


const cleanArray = (arr) => {
  return arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.name,
      image: elem.sprites.front_default,
      hp: elem.stats[0].base_stat,
      attack: elem.stats[1].base_stat,
      defense: elem.stats[2].base_stat,
      speed: elem.stats[5].base_stat,
      height: elem.height, 
      weight: elem.weight,
    };
  });
};

const getAllPokemons = async () => {
  const databasePokemons = await Pokemon.findAll();
  const apiResponse = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=12');
  const apiPokemonsRAW = apiResponse.data.results;

  // Separamos la request a la API para cada pokemon para obtener las stats
  const apiPokemonsPromises = apiPokemonsRAW.map(pokemon => axios.get(pokemon.url));
  const apiPokemonsResponses = await Promise.all(apiPokemonsPromises);

  // Extraemos la data de la response
  const apiPokemonsData = apiPokemonsResponses.map(response => response.data);

  // Limpiamos la data 
  const apiPokemons = cleanArray(apiPokemonsData);

  return [...databasePokemons, ...apiPokemons];
};


const getPokemonById = async (id, source) => {
  const pokemon = source === 'api'
  ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data 
  : await Pokemon.findByPk(id);

  return cleanArray([pokemon])
};

const createPokemon = async (name, image, hp, attack, defense, speed, height, weight) => {
  await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight });
};


const searchPokemonByNames = async (req, res) => {
  const { name } = req.query;
  const { language = 'en' } = req.query;
  console.log(name);
  try {
    const lowerCaseName = name.toLowerCase();
    const databasePokemons = await Pokemon.findAll({
      attributes: ['name'],
      where: {
        name: {
          [Op.iLike]: `%${lowerCaseName}%`,
        },
      },
    });

    const apiPokemonsResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species`);
    const apiPokemons = apiPokemonsResponse.data.results;
    const filteredApi = apiPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(lowerCaseName));

    const translatedApiPokemons = await Promise.all(filteredApi.map(async (pokemon) => {
      const pokemonSpeciesResponse = await axios.get(pokemon.url);
      const translatedName = pokemonSpeciesResponse.data.names.find((nameObj) => nameObj.language.name === language)?.name;
      return { name: translatedName || pokemon.name };
    }));

    const allMatches = [...databasePokemons, ...translatedApiPokemons];
    const exactMatches = allMatches.filter((pokemon) => pokemon.name.toLowerCase() === lowerCaseName);

    res.status(200).json(exactMatches.length > 0 ? exactMatches : allMatches.length > 0 ? allMatches : null);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to search for Pokémon' });
  }
};

module.exports = {
  getAllPokemons,
  getPokemonById,
  createPokemon,
  searchPokemonByNames,
};
