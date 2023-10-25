const { Router } = require('express');
const { Type } = require('../db');
const axios = require('axios');

const getType = async (req, res) => {
  try {
    // Fetch types from the API
    const response = await axios.get('https://pokeapi.co/api/v2/type');
    const apiTypes = response.data.results;

    // Extract type names from the API response
    const typeNames = apiTypes.map((type) => {
      const typeName = type.name;
      return { name: typeName };
    });

    const createdTypes = await Promise.all(
      typeNames.map(async (typeName) => {
        try {
          return Type.findOrCreate({
            where: { name: typeName.name },
            defaults: typeName,
          });
        } catch (error) {
          console.error('Error creating or updating type:', error);
        }
      })
    );

    res.json(createdTypes);
  } catch (error) {
    console.error('Error fetching or saving types:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { getType };
