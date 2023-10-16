import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import style from './Cards.module.css'

const Cards = (props) => {
    const getProgressBarStyle = (value) => {
        return {
            background: `linear-gradient(to right, #FF5733 ${value}%, #D8D8D8 ${value}%)`
        };
    };

    return (
        <div className={style.card}>
           <Link to='/Detail'>
            <p className={style.p}>id: {props.id}</p>
            <p className={style.pokemonName}>Name: {props.name}</p>
            <img src={props.image} alt={props.name} />

                <p className={style.statName}>HP</p>
            <div className={style['progress-bar']} data-label={props.hp} style={getProgressBarStyle(props.hp)}>
            </div>

                <p className={style.statName}>Attack</p>
            <div className={style['progress-bar']} data-label={props.attack} style={getProgressBarStyle(props.attack)}>
            </div>

                <p className={style.statName}>Defense</p>
            <div className={style['progress-bar']} data-label={props.defense} style={getProgressBarStyle(props.defense)}>
            </div>

                <p className={style.statName}>Speed</p>
            <div className={style['progress-bar']} data-label={props.speed} style={getProgressBarStyle(props.speed)}>
            </div>

            <p className={style.height}>height: {props.height}</p>
            <p className={style.weight}>weight: {props.weight}</p>
            <p className={style.type}>type: {props.type}</p>
            </Link> 
        </div>
    );
};

export default Cards;
