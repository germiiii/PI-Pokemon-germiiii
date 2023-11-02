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
  const [totalPages, setTotalPages] = useState(Math.ceil(pokemons.length / itemsPerPage));
  useEffect(() => {
    dispatch(getPokemons()).then(() => {
      // una vez que los datos estan listos quitamos el loading
      setLoading(false);
    });
  }, []);

  //calculamos las paginas totales basados en el filtrado o la busqeda
  useEffect(() => {
    const filteredPokemons = displayPokemons(pokemons, selectedType, selectedOrigin);
    setTotalPages(Math.ceil(filteredPokemons.length / itemsPerPage));
  },[pokemons, selectedType, selectedOrigin])

  const displayPokemons = (pokemons, selectedTypes, selectedOrigin) => {
    return pokemons.filter((pokemon) => {
      const typeFilters = selectedTypes.length === 0 || selectedTypes.every((type) => pokemon.types.includes(type));
     // diferenciamos los pokemons de la api id = integer con los de la DB id=UUID (NaN)
      const originFilter = selectedOrigin === 'All' || (selectedOrigin === 'API' && Number.isInteger(pokemon.id) || (selectedOrigin === 'Database' && !Number.isInteger(pokemon.id))); 
      return typeFilters && originFilter;
    });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);

    // calculamos el rango del slice basados en la pagina actual 
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // chequeamos si estamos en el final del array inicial de pokemons
    if (endIndex > pokemons.length) {
      // actualizamos el offset para el proximo batch de pokemons
      setOffset(offset + offsetIncrement);
      const limit = offsetIncrement * 2;
      // pedimos el nuevo batch de pokemones
      dispatch(getNextBatch(offset + offsetIncrement, limit));
    }
    if (startIndex >= sortedResult.length) {
      setCurrentPage(1);
    }
  };

  
  const sortPokemons = (pokemons) => {
    // ordenamos los pokemons en base a lo seleccionado 
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
  //chequeamos si tenemos resultados de busqueda, sino mostramos los pokemons
  const result = (searchResults && searchResults.length > 0) ? searchResults :displayPokemons(pokemons, selectedType, selectedOrigin);
  const sortedResult = sortPokemons(result)

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage ;

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
    {loading ? ( <div className={styles.loading}></div> ) : (
      <div>
        <CardsContainer pokemons={sortedResult.slice(startIndex, endIndex)} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    )}
  </div>
);
};

export default Home;
