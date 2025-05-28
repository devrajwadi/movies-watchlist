import React from "react"
import MovieCard from './MovieCard'
import './MovieList.css'

const MovieList = ({ movies, isSearchResults, onMoviesChange }) => {
    if(!movies || movies.length === 0) {
        return (
            <div className="no-movies">
                {isSearchResults ?
                    'No movies found matching your search. Try another query!' :
                    'No movies in your watchlist. Search for movies to add!'}
            </div>
        )
    }

    return (
        <div className="movie-list">
            {movies.map(movie => (
                <MovieCard
                    key = {movie.imdbID || movie.id}
                    movie = {movie}
                    isSearchResult = {isSearchResults}
                    onMoviesChange = {onMoviesChange}
                />
            ))}
        </div>
    )
}

export default MovieList 