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
                    hp: pokemonData.stats[0].base_stat,
                    atk: pokemonData.stats[1].base_stat,
                    def: pokemonData.stats[2].base_stat,
                    spd: pokemonData.stats[5].base_stat,
                    heigth: pokemonData.heigth,
                    weight: pokemonData.weight,
                };
                await Pokemon.create(newPokemon);
            })
        );
        console.log('Database populated with PokeAPI data.');
    } catch (error) {
        console.error('Error populating database:', error);
    }
};

populateDBWithPokeAPI();
