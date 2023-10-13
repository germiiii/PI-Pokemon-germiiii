const { Router } = require('express');
const { Type }= require('../db');
const axios = require('axios');

const cleanType = (arr) => {
    return arr.map(elem => {
      return {
        name: elem.name
      };
    });
  };

const getType = async (req, res) => {
    const DBTypesRAW = await Type.findAll();
    const apiTypesRaw = (await axios.get(`https://pokeapi.co/api/v2/type`)).data;
    const apiTypesArray = Object.values(apiTypesRaw.results);
     const apiT = cleanType(apiTypesArray)
    return [...DBTypesRAW, ...apiT];
  };
module.exports = {getType}
