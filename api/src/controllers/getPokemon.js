const { Router } = require('express');
const axios = require('axios');
const { Op } = require('sequelize');
const { Pokemon, Type} = require('../db');


const cleanArray = (arr) => {
  return arr.map((elem) => {
    const types = elem.types.map(typeObj => typeObj.type.name);
    
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
      types: types,
    };
  });
};
const cleanDb = (arr) => {
  return arr.map((pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      image:pokemon.image,
      hp:pokemon.hp,
      attack:pokemon.attack,
      defense:pokemon.defense,
      speed:pokemon.speed,
      height:pokemon.height,
      weight:pokemon.weight,
      types: pokemon.types?.map((type) => (type.name)),
    }
  })
}

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
  : await Pokemon.findByPk(id);

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

  // Create the new Pokémon record.
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
    const { name } = req.params;
    const { language = 'en' } = req.query;

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
    });

    const apiPokemonsResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species`);
    const apiPokemons = apiPokemonsResponse.data.results;

    const pokemonDataPromises = apiPokemons
      .filter((pokemon) => pokemon.name.toLowerCase().includes(lowerCaseName))
      .map(async (pokemon) => {
        const pokemonSpeciesResponse = await axios.get(pokemon.url);
        const pokemonData = await axios.get(pokemonSpeciesResponse.data.varieties[0].pokemon.url);
        return cleanArray(pokemonData.data);
      });

    const apiPokemonsData = await Promise.all(pokemonDataPromises);

    const allMatches = [...databasePokemons, ...apiPokemonsData];

    return(allMatches);
  } catch (error) {
    res.status(400).json({ error: 'Failed to search for Pokémon' });
  }
};


module.exports = {
  getAllPokemons,
  getPokemonById,
  createPokemon,
  searchPokemonByNames,
};
