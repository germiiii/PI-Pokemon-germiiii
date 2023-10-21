import { GET_POKEMONS, GET_POKEMON, GET_NEXT_BATCH , SEARCH_POKEMON, CLEAN_SEARCH} from './actions';

const initialState = {
  pokemons: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    next: null,
    previous: null,
    searchResults: [],
    pokemon: []
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case SEARCH_POKEMON:
      return{
        ...state,
        searchResults: action.payload,
      } 
    case CLEAN_SEARCH:
      return{
        ...state,
        searchResults: [],
      } 
    case GET_POKEMON:
      return {
        ...state,
        searchResults: action.payload,
      };

    case GET_NEXT_BATCH:
      return {
        ...state,
        pokemons: [...state.pokemons, ...action.payload], // Merge the new batch with the existing Pokémon data
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
