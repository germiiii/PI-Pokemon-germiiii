import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../components/Pagination/Pagination';
import { getNextBatch, getPokemons } from '../../redux/actions';
import CardsContainer from '../../components/CardsContainer/CardsContainer';

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const searchResults = useSelector((state) => state.searchResults);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [offset, setOffset] = useState(0); // Keep track of offset
  const offsetIncrement = 120; // The increment for the offset
  //filtros 

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

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

  // Calculate the slice range based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const resultsAvailable = Array.isArray(searchResults) && searchResults.length > 0;

  return (
    <div>
      <div>
      </div>
      <CardsContainer pokemons={resultsAvailable ? searchResults : pokemons.slice(startIndex, endIndex)} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default Home;
