import axios from 'axios';
import { useDispatch } from 'react-redux';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON = 'GET_POKEMON';

export const getPokemons = () => {
    return async function(dispatch){
        const apiData = await axios.get("https://pokeapi.co/api/v2/pokemon")
    
    const pokemon = apiData.data;
    dispatch({ type: GET_POKEMONS, payload: pokemon });
    	};
};

export const getPokemon = (id) => {
    return async function(dispatch){
        const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    
    const pokemon = apiData.data;
    dispatch({ type: GET_POKEMON, payload: pokemon });
    	};
};

// export const filterBySource = () => {
//     dispatch({ type: 'FILTER_BY_SOURCE'})
// }
