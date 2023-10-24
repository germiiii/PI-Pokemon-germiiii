import { GET_POKEMONS, GET_POKEMON, GET_NEXT_BATCH , SEARCH_POKEMON, CLEAN_SEARCH, FILTER_POKEMONS} from './actions';

const initialState = {
  pokemons: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    next: null,
    previous: null,
    searchResults: [],
    pokemon: [],
  },
  filter: {
    type:'',
    origin:'',
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
      case FILTER_POKEMONS:
        return {
          ...state,
          filter: {
            type: action.payload.type,
            origin: action.payload.origin,
          },
        };

    case GET_NEXT_BATCH:
      return {
        ...state,
        pokemons: [...state.pokemons, ...action.payload], 
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
