import React from 'react';
import style from './Detail.module.css';
import ProgressBar from '../../components/ProgressBar/ProgresBar';
import Type from '../../components/Type/Type'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { deletePokemon } from '../../redux/actions';
import { useDispatch } from 'react-redux';


const Detail = (props) => {
  const state = props.location.state; // accedemos al estado recibido por props

const isDb = state.id === null

const dispatch = useDispatch();
const history = useHistory();

const handleDelete = () => {
  dispatch(deletePokemon(state.name))
  history.push('/home')
}
const handleBack = () => {
  history.push('/home')
}

  if (!state) {
    // Handle the case when there's no state data (e.g., when directly accessing the route)
    return <div>No data available.</div>;
  }
  return (
    <div className={style.pokedexDetail}>
    <div className={style.buttonc}>
        <button className={style.button} onClick={handleBack}>Back</ button>
   </div>
  
    <div className={`${style.pokename} ${style['slide-in-from-left']}`}>
    <h2 className={style.pokemonName}>{state.name}</h2>
    </div>
    <div className={style.id}>
    <p className={style.p}>{isDb ? 'Created by user' : `#${state.id}`}</p>
    {isDb && (
      <button onClick={handleDelete} className={style.deleteButton}>
            Delete
          </button>
        )}
        </div>
    <div className={style.pack}>
    <div className={style.imageContainer}>
      <img className={style.image} src={state.image} alt={state.name} />
    </div>
    <div className={style.stats}>
      <div className={style.stat}>
        <p className={style.statName}>HP</p>
        <ProgressBar value={state.hp} name="hp" />
      </div>
      <div className={style.stat}>
        <p className={style.statName}>Attack</p>
        <ProgressBar value={state.attack} name="atk" />
      </div>
      <div className={style.stat}>
        <p className={style.statName}>Defense</p>
        <ProgressBar value={state.defense} name="defense" />
      </div>
      <div className={style.stat}>
        <p className={style.statName}>Speed</p>
        <ProgressBar   value={state.speed} name="spd" />
      </div>
    </div>
    </div>
    
    <div className={style.size}>
      <div className={style.measures}>
    <p className={style.height}>Height: {state.height}</p>
    <p className={style.weight}>Weight: {state.weight}</p>
    </div>
    <div className={style.type}>
      <div className={style.typetxt}>Types</div>
      {Array.isArray(state.type)
        ? state.type.map((pokemonType, index) => (
          <Type key={index} type={pokemonType} />
          ))
          : <Type key={0} type={state.type} />
        }
        </div>
    </div>
  </div>
  );
};

export default Detail;
