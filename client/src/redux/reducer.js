import { GET_POKEMONS, GET_POKEMON } from './actions';

const initialState = {
  pokemons: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    next: null,
    previous: null,
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      const { results, next, previous } = action.payload;
      return {
        ...state,
        pokemons: action.payload,
        pagination: {
          currentPage: state.pagination.currentPage, // You can calculate this based on your logic
          totalPages: state.pagination.totalPages, // You can calculate this based on your logic
          next,
          previous,
        },
      };

    case GET_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
