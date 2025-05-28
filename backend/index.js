const express = require("express");
const axios = require("axios");
const cors = require("cors");
const moviesRouter = require("./routes/movies");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Updated CORS configuration to allow your frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000", // for local development
      "https://movies-watchlist-frontend.vercel.app", // replace with your actual Vercel URL
      "https://movies-watchlist.vercel.app", // another possible URL format
      "https://devrajwadi-movies-watchlist.vercel.app", // based on your GitHub username
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/movies", moviesRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Movie Watchlist API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
