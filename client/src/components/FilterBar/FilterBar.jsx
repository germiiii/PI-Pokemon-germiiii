import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../Button/Button'
import styles from'./FilterBar.module.css'

const FilterBar = ({selectedType, setSelectedType, selectedOrigin, setSelectedOrigin, setSortType, setSortOrder, sortOrder}) => {


const [showCheckboxes, setShowCheckboxes] = useState(false);


const onTypeChange = (event) => {
  const type = event.target.value;
  
  if (selectedType.includes(type)) {
    setSelectedType(selectedType.filter((t) => t !== type));
  } else {
    setSelectedType([...selectedType, type]);
  }
  
};


const clearFilters = () => {
  // Reset the selectedType and selectedOrigin to clear filters
  setSelectedType([]);
  setSelectedOrigin('All');
  setSortOrder('asc')
  setSortType('none')
};


const areFiltersSelected = selectedType.length > 0 || selectedOrigin !== 'All';

const handleClick = () => {
  setShowCheckboxes(!showCheckboxes);
}
  const handleSortName = () => {
    setSortType('name')
  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }
  const handleSortAtk = () => {
    setSortType('attack')
  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

return (
  <div className={styles.pokedexfilter}>
      <div className={styles.buttoncont}>
        <button className={styles.button} onClick={handleClick}>Filter</button>
      {showCheckboxes && (
        <div className='styles.typefilters'>
        <div className={`${styles.typecheckboxes} ${styles['slide-in-from-left']}`}>
      <label>
  <input type="checkbox" value="normal" checked={selectedType.includes('Normal')} onChange={onTypeChange} className={styles.check} />
  Normal
</label>
<label>
  <input type="checkbox" value="fire" checked={selectedType.includes('Fire')} onChange={onTypeChange} className={styles.check}/>
  Fire
</label>
<label>
  <input type="checkbox" value="water" checked={selectedType.includes('Water')} onChange={onTypeChange} className={styles.check}/>
  Water
</label>
<label>
  <input type="checkbox" value="grass" checked={selectedType.includes('Grass')} onChange={onTypeChange} className={styles.check}/>
  Grass
</label>
<label>
  <input type="checkbox" value="electric" checked={selectedType.includes('Electric')} onChange={onTypeChange} className={styles.check}/>
  Electric
</label>
<label>
  <input type="checkbox" value="ice" checked={selectedType.includes('Ice')} onChange={onTypeChange} className={styles.check}/>
  Ice
</label>
<label>
  <input type="checkbox" value="fighting" checked={selectedType.includes('Fighting')} onChange={onTypeChange} className={styles.check}/>
  Fighting
</label>
<label>
  <input type="checkbox" value="poison" checked={selectedType.includes('Poison')} onChange={onTypeChange} className={styles.check} />
  Poison
</label>
<label>
  <input type="checkbox" value="ground" checked={selectedType.includes('Ground')} onChange={onTypeChange} className={styles.check}/>
  Ground
</label>
<label>
  <input type="checkbox" value="flying" checked={selectedType.includes('Flying')} onChange={onTypeChange} className={styles.check}/>
  Flying
</label>
<label>
  <input type="checkbox" value="psychic" checked={selectedType.includes('Psychic')} onChange={onTypeChange} className={styles.check}/>
  Psychic
</label>
<label>
  <input type="checkbox" value="bug" checked={selectedType.includes('Bug')} onChange={onTypeChange} className={styles.check}/>
  Bug
</label>
<label>
  <input type="checkbox" value="rock" checked={selectedType.includes('Rock')} onChange={onTypeChange} className={styles.check}/>
  Rock
</label>
<label>
  <input type="checkbox" value="ghost" checked={selectedType.includes('Ghost')} onChange={onTypeChange} className={styles.check}/>
  Ghost
</label>
<label>
  <input type="checkbox" value="steel" checked={selectedType.includes('Steel')} onChange={onTypeChange} className={styles.check}/>
  Steel
</label>
<label>
  <input type="checkbox" value="dragon" checked={selectedType.includes('Dragon')} onChange={onTypeChange} className={styles.check}/>
  Dragon
</label>
<label>
  <input type="checkbox" value="dark" checked={selectedType.includes('Dark')} onChange={onTypeChange} className={styles.check}/>
  Dark
</label>
<label>
  <input type="checkbox" value="fairy" checked={selectedType.includes('Fairy')} onChange={onTypeChange} className={styles.check}/>
  Fairy
</label>
<label>
  <input type="checkbox" value="unknown" checked={selectedType.includes('Unknown')} onChange={onTypeChange} className={styles.check}/>
  Unknown
</label>
<label>
  <input type="checkbox" value="shadow" checked={selectedType.includes('Shadow')} onChange={onTypeChange} className={styles.check}/>
  Shadow
</label>
</div>
      </div>
    )}
    <div className={styles.origin}>
      <label>Filter by Origin:</label>
      <select className={styles.select} value={selectedOrigin} onChange={(event) => setSelectedOrigin(event.target.value)}>
        <option value="All">All</option>
        <option value="API">API</option>
        <option value="Database">Database</option>
      </select>
      {areFiltersSelected && <button className={styles.button} onClick={clearFilters}>Clear Filters</button>}
      </div>
      <div className={styles.sortButtons}>
        <button className={styles.sortButton} onClick={handleSortAtk}>{sortOrder === 'asc' ? 'Attack +' : 'Attack -'}</button>
        <button className={styles.sortButton} onClick={handleSortName}>{sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</button>
      </div>
    </div>
    </div>
  );
};

export default FilterBar;
