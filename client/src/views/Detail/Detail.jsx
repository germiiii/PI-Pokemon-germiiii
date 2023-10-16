import React from 'react';
import style from './Detail.module.css';

const Detail = (props) => {
  const getProgressBarStyle = (value) => {
    return { width: `${value}%`, backgroundColor: 'blue' };
  };

  const getTypeColor = (type) => {
    if (type) {
      switch (type.toLowerCase()) {
        case 'electric':
          return 'yellow';
        case 'fire':
          return 'red';
        case 'water':
          return 'blue';
        // Add more cases for other types
        default:
          return 'gray';
      }
    } else {
      return 'gray';
    }
  };

  return (
    <div className={style.card}>
      <h1 className={style.title}>Pokemon Detail</h1>
      <div className={style.imageContainer}>
        <img className={style.image} src={props.image} alt={props.name} />
      </div>
      <h2 className={style.pokemonName}>Name: {props.name}</h2>
      <p className={style.p}>ID: {props.id}</p>
      <div className={style.stats}>
        <div className={style.stat}>
          <p className={style.statName}>HP</p>
          <div className={style['progress-bar']} data-label={props.hp} style={getProgressBarStyle(props.hp)}></div>
        </div>
        <div className={style.stat}>
          <p className={style.statName}>Attack</p>
          <div className={style['progress-bar']} data-label={props.attack} style={getProgressBarStyle(props.attack)}></div>
        </div>
        <div className={style.stat}>
          <p className={style.statName}>Defense</p>
          <div className={style['progress-bar']} data-label={props.defense} style={getProgressBarStyle(props.defense)}></div>
        </div>
        <div className={style.stat}>
          <p className={style.statName}>Speed</p>
          <div className={style['progress-bar']} data-label={props.speed} style={getProgressBarStyle(props.speed)}></div>
        </div>
      </div>
      <p className={style.height}>Height: {props.height}</p>
      <p className={style.weight}>Weight: {props.weight}</p>
      <p className={style.type}>
        Type: <span className={style.typeColor} style={{ backgroundColor: getTypeColor(props.type) }}></span> {props.type}
      </p>
    </div>
  );
};

export default Detail;
