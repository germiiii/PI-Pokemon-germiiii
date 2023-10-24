import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../components/Pagination/Pagination';
import { getNextBatch, getPokemons } from '../../redux/actions';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import FilterBar from '../../components/FilterBar/FilterBar';

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const searchResults = useSelector((state) => state.searchResults);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [offset, setOffset] = useState(0); // Keep track of offset
  const offsetIncrement = 120; // The increment for the offset
  // Filters
  const [selectedType, setSelectedType] = useState([]); // State for selected type
  const pokemonsByType = []; // Object to store Pokémon by type

  useEffect(() => {
    dispatch(getPokemons());
  }, []);
  // console.log(pokemons)
  const totalPages = Math.ceil(pokemons.length / itemsPerPage) + 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);

    // Calculate the slice range based on the current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Check if you're at the end of the current batch
    if (endIndex > pokemons.length) {
      // Update the offset for the next batch
      setOffset(offset + offsetIncrement);
      const limit = offsetIncrement * 2;
      // Fetch the next batch of Pokémon
      dispatch(getNextBatch(offset + offsetIncrement, limit));
    }
  };
  console.log('selectedType',selectedType)
  //console.log('pokemons',pokemons)
  const displayPokemons = (pokemons, selectedTypes) => {
    return pokemons.filter((pokemon) => {
      console.log('pokemon.types',pokemon.types)
      return selectedTypes.every((type) => pokemon.types.includes(type));
    });
  };
  
  console.log('function',displayPokemons(pokemons,selectedType))
  //console.log('pokemonbytype',pokemonsByType	)
  
  const result = (searchResults && searchResults.length > 0) ? searchResults : (pokemons && pokemons.length > 0) ? pokemons : [];




  // Calculate the slice range based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

 //console.log('result',result)

  return (
    <div>
      <div>
      <FilterBar selectedType={selectedType} setSelectedType={setSelectedType} />
      </div>
      <CardsContainer pokemons={result
    .slice(startIndex, endIndex)} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default Home;
