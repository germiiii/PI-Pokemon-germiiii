const cleanArray = (arr) => {
    return arr.map((elem) => {
      const types = elem.types.map(typeObj => typeObj.type.name);
      
      return {
        id: elem.id,
        name: elem.name,
        image: elem.sprites.front_default,
        hp: elem.stats[0].base_stat,
        attack: elem.stats[1].base_stat,
        defense: elem.stats[2].base_stat,
        speed: elem.stats[5].base_stat,
        height: elem.height, 
        weight: elem.weight,
        types: types,
      };
    });
  };
  const cleanDb = (arr) => {
    return arr.map((pokemon) => {
      return {
        id: pokemon.id,
        name: pokemon.name,
        image:pokemon.image,
        hp:pokemon.hp,
        attack:pokemon.attack,
        defense:pokemon.defense,
        speed:pokemon.speed,
        height:pokemon.height,
        weight:pokemon.weight,
        types: pokemon.types?.map((type) => (type.name)),
      }
    })
  }

  module.exports = {
    cleanDb,
    cleanArray
  }
