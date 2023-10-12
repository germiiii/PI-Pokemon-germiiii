const { Router } = require('express');
const axios = require('axios');
const getPokemon = Router();

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

const getAllPokemons = async (req, res) => {
    const databasePokemons = await Pokemon.findAll();
    const apiPokemonsRAW = (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=12')).data;
    const apiPokemons = cleanArray(apiPokemonsRAW.results);
    return [...databasePokemons, ...apiPokemons]
}

const getPokemonById = async (id, source) => {
  const pokemon = source === 'api'?
  (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data :
  await Pokemon.findByPk(id);

  return pokemon
};

const createPokemon = async (name,image,hp,attack,defense,speed,heigth,weigth) => {
    await Pokemon.create ({name,image,hp,attack,defense,speed,heigth,weigth})
};

const searchPokemonByName = async (name) => {
  try {
    const databasePokemons = await Pokemon.findAll({ where: { name: name } });
    const apiPokemonsRAW = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data;
    const apiPokemons = cleanArray(apiPokemonsRAW);
    return [...databasePokemons, ...apiPokemons];
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
};
