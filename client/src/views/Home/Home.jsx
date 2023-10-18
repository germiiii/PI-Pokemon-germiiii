import React, { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination/Pagination'; // Import the Pagination component
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../../redux/actions'; // Import your action
import CardsContainer from '../../components/CardsContainer/CardsContainer';

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of items per page
  
  useEffect(() => {
    dispatch(getPokemons((currentPage - 1) * itemsPerPage, itemsPerPage));
  }, [currentPage, dispatch]);
  
  // Check if pokemons is defined before calculating totalPages
  const totalPages = pokemons ? Math.ceil(pokemons.length / itemsPerPage) : 0;
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  console.log(`home:` , pokemons) //------------------------------------------------------------------
  return (
    <div>
      {pokemons ? (
        <div>
          <CardsContainer pokemons={pokemons} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      ) : (
        <div>Loading...</div> // Handle the case where pokemons is not yet defined
      )}
    </div>
  );
};

export default Home;
