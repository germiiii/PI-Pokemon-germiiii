const { Router } = require('express');
const { Type }= require('../db');
const axios = require('axios');

const cleanType = (arr) => {
    arr.map(elem => {
        return{
            name:elem.name,
        }
    })
}

const getType = async (req,res) => {
    const DBTypesRAW = await Type.findAll();
    const DBTypes = cleanType(DBTypesRAW);
    const apiTypesRaw = (await axios.get(`https://pokeapi.co/api/v2/type`)).data;
    const apiTypes = cleanType(apiTypesRaw);
    return [...DBTypes , ...apiTypes]
}

module.exports = {getType}
