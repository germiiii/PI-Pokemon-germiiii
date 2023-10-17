import Cards from "../Card/Cards"
import style from './CardsContainer.module.css'

const CardsContainer = ()=>{

    const pokemons =[
        {
          "id": 1,
          "name": "Pikachu",
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
          "hp": 35,
          "attack": 55,
          "defense": 40,
          "speed": 90,
          "height": 4,
          "weight": 6,
          "type": "Electric"
        },
        {
          "id": 2,
          "name": "Eevee",
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
          "hp": 52,
          "attack": 45,
          "defense": 48,
          "speed": 65,
          "height": 0.3,
          "weight": 6.5,
          "type": "Normal"
        },
        {
          "id": 3,
          "name": "Vulpix",
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png",
          "hp": 38,
          "attack": 41,
          "defense": 40,
          "speed": 50,
          "height": 0.6,
          "weight": 9.0,
          "type": "Fire"
        },
        {
          "id": 4,
          "name": "Jigglypuff",
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png",
          "hp": 115,
          "attack": 45,
          "defense": 20,
          "speed": 45,
          "height": 0.5,
          "weight": 4.0,
          "type": "Normal"
        },
        {
          "id": 5,
          "name": "Meowth",
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png",
          "hp": 40,
          "attack": 45,
          "defense": 35,
          "speed": 70,
          "height": 0.4,
          "weight": 4.0,
          "type": "Normal"
        }
      ]

    //const pokemons = useSelector(state=> state.pokemon)
    return(
        <div className={style.cardsContainer}>
            {pokemons.map(pokemon =>{
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
                weigth={pokemon.weight}
                type={pokemon.type}
                />
            })}
        </div>
    )
}

export default CardsContainer
