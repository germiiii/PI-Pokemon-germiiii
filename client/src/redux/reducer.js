import { GET_POKEMONS, GET_POKEMON } from './actions'

const initialState = {
    pokemon: [],
};


const rootReducer=(state=initialState , action)=>{
    switch(action.type) {
        case GET_POKEMONS:
            return {...state, pokemon: action.payload };

        case GET_POKEMON:
            return {...state, pokemon: action.payload };

        default:
            return{ ...state };
    }
};

export default rootReducer;
