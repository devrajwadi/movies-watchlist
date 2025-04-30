const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/search', async (req, res) => {
    const { title } = req.query;
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${title}`)
        res.json(response.data);
    }
    catch (err) {
        res.status(500).json({error: 'Failed to fetch search results'});
    }
});

module.exports = router