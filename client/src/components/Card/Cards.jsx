import React from 'react';
import style from './Cards.module.css';
import PokemonType from '../../components/Type/Type'; 
import { Link } from 'react-router-dom';

const Cards = (props) => {
    const { id, name, image, height, weight, type , hp , attack , defense, speed} = props;
  
    return (
      <div className={style.card}>
        <div className={style.cont}>
        <p className={style.pokemonName}>{name}</p>
        {id && <p className={style.p}>#{id}</p>}
        </div>
        <div className={style.imgcont}>
        <Link to={{
          pathname: '/detail',
          state: { id, name, image, height, weight, type , hp , attack ,defense, speed}
        }}>
          <img src={image} alt={name} className={style.img} />
        </Link>
        </div>
        <div className={style.type}>
          {Array.isArray(type)
            ? type.map((pokemonType, index) => (
              
                <PokemonType key={index} type={pokemonType} />
              ))
            : <PokemonType key={0} type={type} />
          }
        </div>
      </div>
    );
  };
  
  export default Cards;
  