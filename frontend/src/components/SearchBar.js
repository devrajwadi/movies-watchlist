import React, { useState } from 'react'
import { searchMovies } from '../services/api'
import './SearchBar.css'

const SearchBar = ({ onSearchResults, onClearSearch }) => {
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!query.trim()) {
            onClearSearch()
            return
        }

        setIsLoading(true)
        
        try {
            const data = await searchMovies(query)
            if(data.Response === 'True') {
                onSearchResults(data.Search)
            } else {
                onSearchResults([])
                alert(data.Error || 'No movies found')
            }
        } catch (err) {
            onSearchResults([])
            alert('An error occured while searching for movies')
        } finally {
            setIsLoading(false)
        }
    }

    const handleClear = () => {
        setQuery('')
        onClearSearch()
    }

    return (
        <div className="search-bar">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value = {query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies..."
                    className="search-input"
                />
                <button type="submit" className="search-button" disabled={isLoading}>
                    Search
                </button>
                {query && (
                    <button
                        type="button"
                        className="clear-button"
                        onClick={handleClear}
                    > Clear </button>
                )}
            </form>
        </div>
    )
}

export default SearchBar