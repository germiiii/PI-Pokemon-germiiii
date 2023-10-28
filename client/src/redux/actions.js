import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON = 'GET_POKEMON';
export const GET_NEXT_BATCH = 'GET_NEXT_BATCH';
export const SEARCH_POKEMON = 'SEARCH_POKEMON';
export const CLEAN_SEARCH = 'CLEAN_SEARCH'
export const CREATE_POKEMON = 'CREATE_POKEMON'


export const getPokemons = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get('http://localhost:3001/pokemon');
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
      console.error("Error fetching Pokémon data:", error);
    }
  };
};

export const getNextBatch = (offset, limit) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/pokemon?offset=${offset}&limit=${limit}`);
      dispatch({ type: GET_NEXT_BATCH, payload: apiData.data });
    } catch (error) {
      console.error("Error fetching the next batch of Pokémon:", error);
    }
  };
};
export const searchPokemon = (search) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/pokemon/names/${search}`);
      dispatch({ type: SEARCH_POKEMON, payload: apiData.data });
    } catch (error) {
      console.error("Error searching Pokémon:", error);
    }
  };
};
export const cleanSearchResults = () => {
  return async function (dispatch) {
dispatch({ type: CLEAN_SEARCH})
  };
};

export const createPokemon = (formData) => {
  return async function (dispatch) {
    try {
      const resp = await axios.post('http://localhost:3001/pokemon', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('action',formData)
        dispatch({ type: CREATE_POKEMON, payload: resp.data });
    } catch (error) {
      console.error("Error searching Pokémon:", error);
    }
  };
};

