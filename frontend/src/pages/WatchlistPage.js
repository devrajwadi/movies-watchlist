import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MovieList from '../components/MovieList'
import { getWatchlist } from '../services/api'
import './WatchlistPage.css'

const WatchlistPage = () => {
    const [watchlist, setWatchlist] = useState([])
    const [filterOption, setFilterOption] = useState('all')

    useEffect(() => {
        loadWatchlist()
    }, [])

    const loadWatchlist = () => {
        const allMovies = getWatchlist();
        setWatchlist(allMovies)
    }

    const getFilteredMovies = () => {
        switch(filterOption) {
            case 'watched':
                return watchlist.filter(movie => movie.watched)
            case 'unwatched':
                return watchlist.filter(movie => !movie.watched)
            default:
                return watchlist
        }
    }

    const filteredMovies = getFilteredMovies()

    return (
        <div className="watchlist-page">
            <div className="watchlist-header">
                <h1>My Watchlist</h1>
                <Link to="/" className="home-link">Back to Home</Link>
            </div>

            <div className="filter-controls">
                <p>Filter by:</p>
                <div className="filter-buttons">
                    <button 
                        className={filterOption === 'all' ? 'active' : ''}
                        onClick={() => setFilterOption('all')}
                    >All Movies</button>
                    <button 
                        className={filterOption === 'watched' ? 'active' : ''}
                        onClick={() => setFilterOption('watched')}
                    >Watched</button>
                    <button 
                        className={filterOption === 'unwatched' ? 'active' : ''}
                        onClick={() => setFilterOption('unwatched')}
                    >Unwatched</button>
                </div>
            </div>

            <div className="watchlist-stats">
                <p>Total Movies: {watchlist.length}</p>
                <p>Watched: {watchlist.filter(movie => movie.watched).length}</p>
                <p>Unwatched: {watchlist.filter(movie => !movie.watched).length}</p>
            </div>

            <div className="watchlist-content">
                <MovieList  
                    movies={filteredMovies}
                    isSearchResults={false}
                    onMoviesChange={loadWatchlist}
                />

                {watchlist.length === 0 && (
                    <div className="empty-watchlist">
                        <p>Your watchlist is empty.</p>
                        <Link to="/" className="add-movies-link">Search and add movies</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WatchlistPage