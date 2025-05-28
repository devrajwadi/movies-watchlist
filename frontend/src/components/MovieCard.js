import React from "react"
import { addToWatchlist, removeFromWatchlist, markAsWatched, markAsUnwatched } from "../services/api"
import './MovieCard.css'

const MovieCard = ({ movie, isSearchResult, onMoviesChange }) => {
    const posterUrl = movie.Poster !== "N/A" && movie.Poster ? movie.Poster
        : "https://via.placeholder.com/300x450?text=No+Image+Available"

    const handleAddToWatchlist = () => {
        addToWatchlist(movie)
        onMoviesChange()
    } 

    const handleRemove = () => {
        const id = movie.imdbID || movie.id 
        removeFromWatchlist(id)
        onMoviesChange()
    }

    const handleToggleWatched = () => {
        const id = movie.imdbID || movie.id
        if(movie.watched) {
            markAsUnwatched(id)
        } else {
            markAsWatched(id)
        }
        onMoviesChange()
    }

    return (
        <div className="movie-card">
            {movie.watched && <div className="watched-badge">Watched</div>}
            <img src={posterUrl} alt={`${movie.Title} poster`} className="movie-poster" />
            <div className="movie-info">
                <h3 className="movie-title">{movie.Title}</h3>
                <p className="movie-year">Year: {movie.Year}</p>

                <div className="movie-actions">
                    {isSearchResult ? (
                        <button className="add-button" onClick={handleAddToWatchlist}>Add to Watchlist</button>
                    ) : (
                        <>
                            <button className={movie.watched ? "mark-unwatched-button" : "mark-watched-button"} onClick={handleToggleWatched} > {movie.watched ? 'Mark Unwatched' : 'Mark Watched'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MovieCard