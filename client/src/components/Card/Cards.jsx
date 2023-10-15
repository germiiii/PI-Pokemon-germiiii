import style from './Cards.module.css'

const Cards = (props) => {
    return (
      <div className={style.card}>
        <p>id: {props.id}</p>
        <p>Name: {props.name}</p>
        <img src={props.image} alt={props.name} />
        <p>hp: {props.hp}</p>
        <p>attack: {props.attack}</p>
        <p>defense: {props.defense}</p>
        <p>speed: {props.speed}</p>
        <p>height: {props.height}</p>
        <p>weight: {props.weight}</p>
        <p>type: {props.type}</p>
      </div>
    );
  };
  
  export default Cards;
