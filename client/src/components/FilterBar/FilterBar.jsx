import React, { useState } from 'react';
import style from './FilterBar.module.css';
import { filterPokemons } from '../../redux/actions';
import { useDispatch } from 'react-redux';


const FilterBar = ({selectedType, setSelectedType}) => {

    const dispatch = useDispatch();
    

const [selectedOrigin, setSelectedOrigin] = useState('');
    
const onTypeChange = (event) => {
    const type = event.target.value;

    if (selectedType.includes(type)) {
        setSelectedType(selectedType.filter((t) => t !== type));
    } else {
        setSelectedType([...selectedType, type]);
    }
    dispatch(filterPokemons(selectedType, selectedOrigin));
};

const onOriginChange = (event) => {
    const origin = event.target.value;
    setSelectedOrigin(origin);
    dispatch(filterPokemons(selectedType, origin));
};

const clearFilters = () => {
    // Reset the selectedType and selectedOrigin to clear filters
    setSelectedType([]);
    setSelectedOrigin('');
  };

//console.log('selected',selectedType)
   return (
    <div>
      <label>
  <input type="checkbox" value="normal" checked={selectedType.includes('Normal')} onChange={onTypeChange} />
  Normal
</label>
<label>
  <input type="checkbox" value="fire" checked={selectedType.includes('Fire')} onChange={onTypeChange} />
  Fire
</label>
<label>
  <input type="checkbox" value="water" checked={selectedType.includes('Water')} onChange={onTypeChange} />
  Water
</label>
<label>
  <input type="checkbox" value="grass" checked={selectedType.includes('Grass')} onChange={onTypeChange} />
  Grass
</label>
<label>
  <input type="checkbox" value="electric" checked={selectedType.includes('Electric')} onChange={onTypeChange} />
  Electric
</label>
<label>
  <input type="checkbox" value="ice" checked={selectedType.includes('Ice')} onChange={onTypeChange} />
  Ice
</label>
<label>
  <input type="checkbox" value="fighting" checked={selectedType.includes('Fighting')} onChange={onTypeChange} />
  Fighting
</label>
<label>
  <input type="checkbox" value="poison" checked={selectedType.includes('Poison')} onChange={onTypeChange} />
  Poison
</label>
<label>
  <input type="checkbox" value="ground" checked={selectedType.includes('Ground')} onChange={onTypeChange} />
  Ground
</label>
<label>
  <input type="checkbox" value="flying" checked={selectedType.includes('Flying')} onChange={onTypeChange} />
  Flying
</label>
<label>
  <input type="checkbox" value="psychic" checked={selectedType.includes('Psychic')} onChange={onTypeChange} />
  Psychic
</label>
<label>
  <input type="checkbox" value="bug" checked={selectedType.includes('Bug')} onChange={onTypeChange} />
  Bug
</label>
<label>
  <input type="checkbox" value="rock" checked={selectedType.includes('Rock')} onChange={onTypeChange} />
  Rock
</label>
<label>
  <input type="checkbox" value="ghost" checked={selectedType.includes('Ghost')} onChange={onTypeChange} />
  Ghost
</label>
<label>
  <input type="checkbox" value="steel" checked={selectedType.includes('Steel')} onChange={onTypeChange} />
  Steel
</label>
<label>
  <input type="checkbox" value="dragon" checked={selectedType.includes('Dragon')} onChange={onTypeChange} />
  Dragon
</label>
<label>
  <input type="checkbox" value="dark" checked={selectedType.includes('Dark')} onChange={onTypeChange} />
  Dark
</label>
<label>
  <input type="checkbox" value="fairy" checked={selectedType.includes('Fairy')} onChange={onTypeChange} />
  Fairy
</label>
<label>
  <input type="checkbox" value="unknown" checked={selectedType.includes('Unknown')} onChange={onTypeChange} />
  Unknown
</label>
<label>
  <input type="checkbox" value="shadow" checked={selectedType.includes('Shadow')} onChange={onTypeChange} />
  Shadow
</label>


      <label>Filter by Origin:</label>
      <select value={selectedOrigin} onChange={onOriginChange}>
        <option value="">All</option>
        <option value="API">API</option>
        <option value="Database">Database</option>
      </select>
      <button onClick={clearFilters}>Clear Filters</button>
    </div>
  );
};

export default FilterBar;
