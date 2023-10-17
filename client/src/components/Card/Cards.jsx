import React from 'react';
import style from './Cards.module.css';
import ProgressBar from '../../components/ProgressBar/ProgresBar';
import PokemonType from '../../components/Type/Type'; 
import { Link } from 'react-router-dom';

const Cards = (props) => {
    // Ensure that props.type is an array, and if not, provide a default empty array.
    const typeArray = Array.isArray(props.type) ? props.type : [];

    return (
        <div className={style.card}>
            <Link to='/Detail'>
                <p className={style.p}>id: {props.id}</p>
                <p className={style.pokemonName}>Name: {props.name}</p>
                <img src={props.image} alt={props.name} />
            </Link> 

            <p className={style.statName}>HP</p>
            <ProgressBar value={props.hp} name='hp'/>

            <p className={style.statName}>Attack</p>
            <ProgressBar value={props.attack} name='atk'/>

            <p className={style.statName}>Defense</p>
            <ProgressBar value={props.defense} name='defense'/>

            <p className={style.statName}>Speed</p>
            <ProgressBar value={props.speed} name='spd'/>

            <p className={style.height}>height: {props.height}</p>
            <p className={style.weight}>weight: {props.weight}</p>
            
            <div className={style.type}>
             {Array.isArray(props.type)
             ? props.type.map((pokemonType, index) => (
            <PokemonType key={index} type={pokemonType} />
              ))
                 : <PokemonType key={0} type={props.type} />
              }
          </div>
        </div>
    );
};

export default Cards;


