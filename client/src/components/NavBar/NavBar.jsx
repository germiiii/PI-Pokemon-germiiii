import React, { useState, useEffect } from 'react';
import styles from './NavBar.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { searchPokemon, getPokemon, cleanSearchResults } from '../../redux/actions';

const NavBar = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const isSearchDisabled = search.trim() === '';
  const history = useHistory(); 

  //chequeamos si la busqueda es por id o por nombre
  const handleSearch = (search) => {
    if (!isNaN(search)) {
      // si la buqueda es un numero despacha la action getPokemon
      dispatch(getPokemon(search));
    } else if (typeof search === 'string') {
      //si la busqueda es un string despacha la action searchPokemon
      dispatch(searchPokemon(search));
      history.push('/home');
    }
  };

  // Automaticamente mostramos todos los pokemons al vaciar la serachbar
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
            <button onClick={() => handleSearch(search)} className={styles.button} disabled={isSearchDisabled}>
              Search
            </button>
            <Link to='/about'>
            <button className={styles.button}>About</button>
            </Link>
          </div>
          <div className={styles.buttoncontainer}>
            <Link to="/home">
              <button className={styles.button}>Home</button>
            </Link>
            <Link to="/create">
              <button className={styles.sbutton}>Create Pokemon</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
