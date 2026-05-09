/**
 * Movie Search Application
 * Fetches movie data from OMDb API and displays it in a beautiful UI
 */

const OMDB_API_KEY = '9808a55d';
const OMDB_BASE_URL = 'https://www.omdbapi.com/';

/**
 * Fetch movie data from OMDb API
 * @param {string} movieTitle - The title of the movie to search
 * @returns {Promise} - Promise that resolves with movie data
 */
function fetchMovieData(movieTitle) {
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('error-message');
    
    // Show loader
    loader.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    
    return fetch(`${OMDB_BASE_URL}?t=${encodeURIComponent(movieTitle)}&apikey=${OMDB_API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            loader.classList.add('hidden');
            
            if (data.Response === 'False') {
                throw new Error(data.Error || 'Movie not found');
            }
            return data;
        })
        .catch(error => {
            loader.classList.add('hidden');
            throw error;
        });
}

/**
 * Display movie data in the UI
 * @param {object} movieData - Movie data object from OMDb API
 */
function displayMovieData(movieData) {
    const movieDetailsDiv = document.getElementById('movie-details');
    const errorMessage = document.getElementById('error-message');
    const welcomeSection = document.getElementById('welcome-section');
    
    try {
        // Update movie title
        const titleElement = document.getElementById('movie-title');
        titleElement.textContent = movieData.Title || 'N/A';
        
        // Update poster
        const posterElement = document.getElementById('movie-poster');
        posterElement.src = movieData.Poster !== 'N/A' ? movieData.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';
        posterElement.alt = movieData.Title;
        
        // Update rating badge
        const ratingBadge = document.getElementById('rating-badge');
        const rating = movieData.imdbRating !== 'N/A' ? movieData.imdbRating : 'N/A';
        ratingBadge.textContent = rating;
        
        // Update metadata
        const yearElement = document.getElementById('movie-year');
        yearElement.textContent = movieData.Year || 'N/A';
        
        const ratedElement = document.getElementById('movie-rated');
        ratedElement.textContent = movieData.Rated || 'N/A';
        
        const runtimeElement = document.getElementById('movie-runtime');
        runtimeElement.textContent = movieData.Runtime || 'N/A';
        
        // Update genre
        const genreElement = document.getElementById('movie-genre');
        genreElement.textContent = movieData.Genre || 'N/A';
        
        // Update plot
        const plotElement = document.getElementById('movie-plot');
        plotElement.textContent = movieData.Plot || 'No plot available';
        
        // Update cast
        const castElement = document.getElementById('movie-cast');
        castElement.textContent = movieData.Actors || 'N/A';
        
        // Update director
        const directorElement = document.getElementById('movie-director');
        directorElement.textContent = movieData.Director || 'N/A';
        
        // Update IMDb rating
        const imdbRatingElement = document.getElementById('movie-imdb-rating');
        imdbRatingElement.textContent = movieData.imdbRating !== 'N/A' 
            ? `${movieData.imdbRating}/10` 
            : 'N/A';
        
        // Show movie details and hide welcome section
        movieDetailsDiv.classList.remove('hidden');
        welcomeSection.classList.add('hidden');
        errorMessage.classList.add('hidden');
        
    } catch (error) {
        console.error('Error displaying movie data:', error);
        showError('Error displaying movie data');
    }
}

/**
 * Display error message to user
 * @param {string} message - Error message to display
 */
function showError(message) {
    const errorMessage = document.getElementById('error-message');
    const movieDetailsDiv = document.getElementById('movie-details');
    
    errorMessage.textContent = `❌ ${message}`;
    errorMessage.classList.remove('hidden');
    movieDetailsDiv.classList.add('hidden');
}

/**
 * Handle search button click or Enter key press
 */
function handleSearch() {
    const searchInput = document.getElementById('movie-search');
    const movieTitle = searchInput.value.trim();
    
    if (movieTitle === '') {
        showError('Please enter a movie title');
        searchInput.focus();
        return;
    }
    
    fetchMovieData(movieTitle)
        .then(displayMovieData)
        .catch(error => {
            console.error('Search error:', error);
            showError(error.message);
            searchInput.focus();
        });
}

/**
 * Clear search results and reset the form
 */
function clearSearch() {
    const searchInput = document.getElementById('movie-search');
    const movieDetailsDiv = document.getElementById('movie-details');
    const welcomeSection = document.getElementById('welcome-section');
    const errorMessage = document.getElementById('error-message');
    
    searchInput.value = '';
    movieDetailsDiv.classList.add('hidden');
    welcomeSection.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    searchInput.focus();
}

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('movie-search');
    const clearButton = document.getElementById('clear-button');
    
    // Search button click
    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }
    
    // Enter key in search input
    if (searchInput) {
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleSearch();
            }
        });
        
        // Auto-focus on page load
        searchInput.focus();
    }
    
    // Clear button click
    if (clearButton) {
        clearButton.addEventListener('click', clearSearch);
    }
}

/**
 * Initialize app on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Movie Search App Initialized');
    initializeEventListeners();
});
