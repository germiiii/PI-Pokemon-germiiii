import Cards from "../Card/Cards";
import style from "./CardsContainer.module.css";

const CardsContainer = ({ pokemons }) => {

  return (
    <div className={style.cardsContainer}>
      {pokemons.map((pokemon) => {
       return <Cards
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          hp={pokemon.hp}
          attack={pokemon.attack}
          defense={pokemon.defense}
          speed={pokemon.speed}
          height={pokemon.height}
          weight={pokemon.weight}
          type={pokemon.types}
        />
      })}
    </div>
  );
};

export default CardsContainer;
