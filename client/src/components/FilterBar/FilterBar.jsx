import React, { useState } from 'react';
import styles from './FilterBar.module.css';
import PokemonType from '../Type/Type';

const FilterBar = ({
  selectedType,
  setSelectedType,
  selectedOrigin,
  setSelectedOrigin,
  setSortType,
  setSortOrder,
  sortOrder,
}) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const onTypeChange = (type) => {
    if (selectedType.includes(type)) {
      setSelectedType(selectedType.filter((t) => t !== type));
    } else {
      setSelectedType([...selectedType, type]);
    }
  };
  
  const handleSortAtk = () => {
    setSortType('attack');
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortName = () => {
    setSortType('name');
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const Types = [
    'normal','fighting', 'flying', 'poison', 'ground', 'rock', 'bug','ghost','steel','fire',
    'water','grass','electric','psychic','ice','dragon','dark','fairy','unknown','shadow' ];
  
  const clearFilters = () => {
    setSelectedType([]);
    setSelectedOrigin('All');
    setSortOrder('asc');
    setSortType('none');
  };

  const areFiltersSelected = selectedType.length > 0 || selectedOrigin !== 'All';

  return (
    <div className={styles.pokedexfilter}>
      <div className={styles.buttoncont}>
        <button className={styles.button} onClick={() => setShowCheckboxes(!showCheckboxes)}>
          Filter
        </button>
        {showCheckboxes && (
          <div className={`${styles.typefilters} ${showCheckboxes ? '' : styles['slide-out-to-left']}`}>
            <div className={`${styles.filt} ${styles['slide-in-from-left']}`}>
              <div className={styles.buttonGrid}>
              {Types.map((type) => (
                <label key={type}>
                  <button type="button" className={`types-button ${selectedType.includes(type) ? styles.selected : ''}`} onClick={() => onTypeChange(type)}  >
                    <PokemonType type={type} className={styles.Types}>{type}</PokemonType>
                  </button>
                </label>
              ))}
              </div>
            </div>
          </div>
        )}
        <div className={styles.origin}>
          <label>Filter by Origin:</label>
          <select className={styles.select} value={selectedOrigin} onChange={(event) => setSelectedOrigin(event.target.value)} >
            <option value="All">All</option>
            <option value="API">API</option>
            <option value="Database">Database</option>
          </select>
          {areFiltersSelected && (
            <button className={styles.button} onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
        <div className={styles.sortButtons}>
          <button className={styles.sortButton} onClick={handleSortAtk}>
            {sortOrder === 'asc' ? 'Attack +' : 'Attack -'}
          </button>
          <button className={styles.sortButton} onClick={handleSortName}>
            {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

