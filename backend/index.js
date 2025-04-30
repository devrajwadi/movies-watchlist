const express = require("express");
const axios = require("axios");
const cors = require("cors");
const moviesRouter = require('./routes/movies');
const dotenv = require('dotenv');

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/movies', moviesRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Movie Watchlist API');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});