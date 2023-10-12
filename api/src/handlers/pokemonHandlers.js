const { createPokemon, getPokemonById, getAllPokemons , searchPokemonByName } = require('../controllers/getPokemon')

const getPokemonsHandler = async (req,res) => {
    const { name } = req.query;
    const results = name ? await searchPokemonByName(name) : await getAllPokemons();
    res.status(200).json(results);
};

const getPokemonHandler = async (req,res) => {
    const { id } = req.params;
    const source = isNaN(id) ? 'Db' : 'api';
    try{
        const pokemon = await getPokemonById(id , source);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createPokemonHandler = async (req,res) => {
    const { name , image , hp , attack , defense , speed , heigth , weight } = req.body;
    try{
    const newPokemon = await createPokemon( name , image , hp , attack , defense , speed , heigth , weight);
    res.status(201).json(newPokemon)
    } catch (error) {
        res.status(400).json ({error: error.message})
    }

}; 

module.exports = {
    createPokemonHandler,
    getPokemonHandler,
    getPokemonsHandler
}
