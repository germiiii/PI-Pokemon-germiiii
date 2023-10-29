import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../components/Pagination/Pagination';
import { getNextBatch, getPokemons } from '../../redux/actions';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import FilterBar from '../../components/FilterBar/FilterBar';
import styles from './Home.module.css'

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const searchResults = useSelector((state) => state.searchResults);
  const itemsPerPage = 12;
  const offsetIncrement = 120; 
  const [loading, setLoading] = useState(true);
  // Filters
  const [selectedType, setSelectedType] = useState([]); 
  const [selectedOrigin, setSelectedOrigin] = useState('All');
  // Sort
  const [sortType, setSortType] = useState('none');
  const [sortOrder, setSortOrder] = useState('asc')
// Pagination  
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0); 

  useEffect(() => {
    dispatch(getPokemons()).then(() => {
      // When data is ready, set loading to false
      setLoading(false);
    });
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

  const displayPokemons = (pokemons, selectedTypes, selectedOrigin) => {
    return pokemons.filter((pokemon) => {
      //console.log('pokemon.types',pokemon.types)
      const typeFilters = selectedTypes.length === 0 || selectedTypes.every((type) => pokemon.types.includes(type));
     
      const originFilter = selectedOrigin === 'All' || (selectedOrigin === 'API' && Number.isInteger(pokemon.id) || (selectedOrigin === 'Database' && !Number.isInteger(pokemon.id))); 
      return typeFilters && originFilter;
    });
  };
  
  const sortPokemons = (pokemons) => {
    // Sort the pokemons based on the selected sorting criteria
    if (sortType === 'name') {
      return pokemons.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    } else if (sortType === 'attack') {
      return pokemons.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.attack - b.attack;
        } else {
          return b.attack - a.attack;
        }
      });
    } else {
      return pokemons; // No sorting
    }
  };

  //console.log('function',displayPokemons(pokemons,selectedType))
  //console.log('pokemonbytype',pokemonsByType	)
  
  const result = (searchResults && searchResults.length > 0) ? searchResults :displayPokemons(pokemons, selectedType, selectedOrigin);

  const sortedResult = sortPokemons(result)

  // Calculate the slice range based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

 //console.log('result',result)

 return (
  <div>
    <div>
      <FilterBar
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        setSelectedOrigin={setSelectedOrigin}
        selectedOrigin={selectedOrigin}
        setSortOrder={setSortOrder}
        setSortType={setSortType}
        sortOrder={sortOrder}
      />
    </div>
    {loading ? (
      <div className={styles.loading}></div>
    ) : (
      <div>
        <CardsContainer pokemons={sortedResult.slice(startIndex, endIndex)} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    )}
  </div>
);
};

export default Home;
