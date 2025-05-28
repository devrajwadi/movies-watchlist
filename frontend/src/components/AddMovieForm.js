import React, { useState } from 'react'
import { addToWatchlist } from '../services/api'
import './AddMovieForm.css'

const AddMovieForm = ({ onMovieAdded }) => {
    const [movieData, setMovieData] = useState({
        title: '',
        Year: '',
        imdbID: '',
        Poster: ''
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target;
        setMovieData({
            ...movieData, 
            [name]: value
        })
    }

    const validateForm = () => {
        const newErrors = {}
        if(!movieData.title.trim()) newErrors.title = 'Title is required'
        if(!movieData.Year.trim()) newErrors.Year = 'Year is required'
        else if(!/^\d{4}$/.test(movieData.Year)) newErrors.Year = 'Year must be a 4-digit number'

        if(!movieData.imdbID.trim()) {
            movieData.imdbID = 'manual-' + Date.now()
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
     }

     const handleSubmit = (e) => {
        e.preventDefault()

        if(validateForm()) {
            if(!movieData.Poster.trim()) {
                movieData.Poster =
                  "https://via.placeholder.com/300x450?text=No+Image+Available";
            }

            addToWatchlist(movieData)
            if(onMovieAdded) onMovieAdded()

            setMovieData({
              title: "",
              Year: "",
              imdbID: "",
              Poster: "",
            })

            alert('Movie added to watchlist successfully!')
        }
     }

     return (
        <div className="add-movie-form">
            <h3>Add Movie Manually</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Movie Title*</label>
                    <input type="text" id="title" name="title" value={movieData.title} onChange={handleChange} className={errors.title ? 'error' : ''} /> 
                {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="Year">Release Year*</label>
                    <input type="text" id="Year" name="Year" value={movieData.Year} onChange={handleChange} placeholder="YYYY" className={errors.Year ? 'error' : ''} />
                    {errors.Year && <span className="error-message">{errors.Year}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="imdbID">IMDB ID (optional)</label>
                    <input type="text" id="imdbID" name="imdbID" value={movieData.imdbID} onChange={handleChange} placeholder="Will be auto-generated if empty" />
                </div>

                <div className="form-group">
                    <label htmlFor="Poster">Poster URL (optional)</label>
                    <input type="text" id="Poster" name="Poster" value={movieData.Poster} placeholder="https://..." />
                </div>

                <button type="submit" className="submit-button">Add to watchlist</button>
            </form>
        </div>
    )
}

export default AddMovieForm