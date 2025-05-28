import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import SearchBar from '../components/SearchBar'
import MovieList from '../components/MovieList'
import AddMovieForm from  '../components/AddMovieForm'
import { searchMovies, getWatchlist } from '../services/api'
import './Home.css'

const Home = () => {
    const [movies, setMovies] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)

    useEffect(() => {
        loadFeaturedMovies();
    }, [])

    const loadFeaturedMovies = () => {
        const watchlist = getWatchlist()
        setMovies(watchlist)
    }

    const handleSearchResults = (results) => {
        setSearchResults(results)
        setIsSearching(results.length > 0)
    }

    const handleClearSearch = () => {
        setSearchResults([])
        setIsSearching(false)
    }

    const handleMoviesChange = () => {
        if(!isSearching) {
            loadFeaturedMovies()
        }
    }

    return ( 
        <div className="home-page">
            <div className="home-header">
                <h1>Movie Watchlist</h1>
                <div className="navigation">
                    <Link to="/watchlist" className="nav-link">My Watchlist</Link>
                </div>
            </div>

            <div className="search-section">
                <SearchBar 
                    onSearchResults={handleSearchResults}
                    onClearSearch={handleClearSearch}
                />
                <button
                    className="add-movie-button"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? 'Cancel' : 'Add movie Manually'}
                </button>
            </div>

            {showAddForm && (
                <div className="add-form-container">
                    <AddMovieForm onMovieAdded={handleMoviesChange} />
                </div>
            )}

            <div className="content-section">
                <h2>{isSearching ? 'Search Results' : 'Featured Movies'}</h2>
                <MovieList 
                    movies = {isSearching ? searchResults : movies} 
                    isSearchResults={isSearching}
                    onMoviesChange={handleMoviesChange}
                />
            </div>
        </div>
    )
}

export default Home