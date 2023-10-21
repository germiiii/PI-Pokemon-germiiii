import React, { useState, useEffect } from 'react';
import styles from './NavBar.module.css';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory
import { useDispatch, useSelector } from 'react-redux';
import { searchPokemon, getPokemon, cleanSearchResults } from '../../redux/actions';

const NavBar = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchResults);
  const isSearchDisabled = search.trim() === '';
  const history = useHistory(); // Get the history object

  const handleSearch = (search) => {
    console.log(search);
    if (typeof search === 'string' && search.trim() !== '') {
      dispatch(searchPokemon(search));
      // Programmatically navigate to the home view with search results
      history.push('/home');
    } else if (typeof search === 'number') {
      dispatch(getPokemon(search));
    }
    console.log(searchResults);
    console.log(dispatch(getPokemon(search)));
  };

  // Automatically clear search results when search bar is empty
  useEffect(() => {
    if (search.trim() === '') {
      dispatch(cleanSearchResults());
    }
  }, [search, dispatch]);

  return (
    <nav className={styles.navBar}>
      <div className={styles.maxWidth}>
        <div className={styles.flex}>
          <h1 className={styles.h1}>Pokédex</h1>
          <div className={styles.searchBar}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search Pokémon"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => handleSearch(search)}
              className={styles.button}
              disabled={isSearchDisabled}
            >
              Search
            </button>
          </div>
          <div>
            <Link to="/home">
              <button className={styles.button}>Home</button>
            </Link>
            <Link to="/create">
              <button className={styles.button}>Create Pokemon</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
