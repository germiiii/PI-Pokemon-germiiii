const axios = require('axios');
const { Pokemon } = require('../models/Pokemon');

const populateDBWithPokeAPI = async () => {
    try{

        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');

        const pokemonData = response.data.results;

        await Promise.all(
            pokemonData.map(async (Pokemon) => {
                const newPokemon = {
                    name: pokemonData.name,
                    img: pokemonData.sprites,
                    hp: pokemonData.hp,
                }
            })
        )
    }
}
