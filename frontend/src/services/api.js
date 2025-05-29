import axios from "axios";

// Update API URL for production deployment
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://movies-watchlist-backend-jjef.onrender.com/api" // Replace with your actual Render URL after deployment
    : "http://localhost:5000/api";

const WATCHLIST_KEY = "movie-watchlist";

// Search movies using backend API
export const searchMovies = async (title) => {
  try {
    const response = await axios.get(`${API_URL}/movies/search`, {
      params: { title },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

// Watchlist functions using localStorage (keeping your existing logic)
export const getWatchlist = () => {
  const watchlist = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || "[]");
  return watchlist;
};

export const addToWatchlist = (movie) => {
  const watchlist = getWatchlist();

  const exists = watchlist.some(
    (m) =>
      (m.imdbID && m.imdbID === movie.imdbID) || (m.id && m.id === movie.id)
  );

  if (!exists) {
    const movieToAdd = { ...movie, watched: false };
    watchlist.push(movieToAdd);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }

  return movie;
};

export const removeFromWatchlist = (id) => {
  const watchlist = getWatchlist();
  const updatedWatchlist = watchlist.filter(
    (movie) =>
      (movie.imdbID && movie.imdbID !== id) || (movie.id && movie.id !== id)
  );
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
  return updatedWatchlist;
};

export const markAsWatched = (id) => {
  const watchlist = getWatchlist();
  const updatedWatchlist = watchlist.map((movie) => {
    if (
      (movie.imdbID && movie.imdbID === id) ||
      (movie.id && movie.id === id)
    ) {
      return { ...movie, watched: true };
    }
    return movie;
  });
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
  return updatedWatchlist;
};

export const markAsUnwatched = (id) => {
  const watchlist = getWatchlist();
  const updatedWatchlist = watchlist.map((movie) => {
    if (
      (movie.imdbID && movie.imdbID === id) ||
      (movie.id && movie.id === id)
    ) {
      return { ...movie, watched: false };
    }
    return movie;
  });
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
  return updatedWatchlist;
};
