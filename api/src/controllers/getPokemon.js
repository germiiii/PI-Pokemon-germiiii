const { Router } = require('express');
const axios = require('axios');
const { Op } = require('sequelize');

const { Pokemon } = require('../db');

const cleanArray = (arr) => {
  return arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.name,
      image: elem.image,
      hp: elem.hp,
      attack: elem.attack,
      defense: elem.defense,
      speed: elem.speed,
      heigth: elem.heigth, 
      weight: elem.weight,
    };
  });
};

const getAllPokemons = async () => {
    const databasePokemons = await Pokemon.findAll();
    const apiPokemonsRAW = (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=12')).data;
    const apiPokemons = cleanArray(apiPokemonsRAW.results);
    return [...databasePokemons, ...apiPokemons]
}

const getPokemonById = async (id, source) => {
  const pokemon = source === 'api'
  ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data 
  : await Pokemon.findByPk(id);

  return cleanArray([pokemon])
};

const createPokemon = async (name, image, hp, attack, defense, speed, height, weight) => {
  await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight });
};

const searchPokemonByName = async (name) => {
  console.log(name)
  try {
    const databasePokemons = await Pokemon.findAll({ attributes: ['name'], where: { name: name } });
    const apiPokemonsRAW = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data;
    const apiPokemons = cleanArray([apiPokemonsRAW]);
    //const filteredApi = apiPokemons.filter((pokemon) => pokemon.name === name)
    return [...databasePokemons, ...apiPokemons];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to search for Pokémon');
  }
};

const searchPokemonByNames = async (name, language = 'en') => {
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

    return exactMatches.length > 0 ? exactMatches : allMatches.length > 0 ? allMatches : null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to search for Pokémon');
  }
};

module.exports = {
  getAllPokemons,
  getPokemonById,
  createPokemon,
  searchPokemonByName,
  searchPokemonByNames,
};
