import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON = 'GET_POKEMON';

export const getPokemons = (offset, limit) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/pokemon?offset=${offset}&limit=${limit}`);
      console.log(`actions:` , apiData.data)
      dispatch({ type: GET_POKEMONS, payload: apiData.data });
    } catch (error) {
      
      console.error("Error fetching Pokémon data:", error);
    }
  };
};

export const getPokemon = (id) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/pokemon/${id}`);
      dispatch({ type: GET_POKEMON, payload: apiData.data });
    } catch (error) {
      // Handle errors here
      console.error("Error fetching Pokémon data:", error);
    }
  };
};
