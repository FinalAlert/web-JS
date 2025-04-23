"use strict";

const API_URL = "https://api.tvmaze.com/shows";
const moviesContainer = document.getElementById("movies-container");
const errorMessage = document.getElementById("error-message");
const searchInput = document.getElementById("search");
const genreFilter = document.getElementById("genre-filter");
const sortNameBtn = document.getElementById("sort-name");
const sortRatingBtn = document.getElementById("sort-rating");

let movies = [];
let allGenres = [];

// Функція для отримання даних з API
async function fetchMovies() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Помилка HTTP: ${response.status}`);
        }

        movies = await response.json();
        displayMovies(movies);
        populateGenreFilter(movies);
    } catch (error) {
        console.error("Помилка при отриманні даних:", error);
        errorMessage.textContent = "Не вдалося завантажити фільми. Будь ласка, спробуйте пізніше.";
    }
}

// Функція для відображення фільмів
function displayMovies(moviesToDisplay) {
    moviesContainer.innerHTML = "";

    if (moviesToDisplay.length === 0) {
        moviesContainer.innerHTML = "<p>Фільми не знайдені</p>";
        return;
    }

    moviesToDisplay.forEach(movie => {
        const { id, name, genres, rating, image, summary } = movie;

        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";
        movieCard.innerHTML = `
            ${image ? `<img src="${image.medium}" alt="${name}">` : '<div class="no-image">Немає зображення</div>'}
            <div class="movie-title">${name}</div>
            <div class="movie-genres">
                ${genres.map(genre => `<span class="genre">${genre}</span>`).join("")}
            </div>
            <div class="movie-rating">Рейтинг: ${rating.average || "н/д"}</div>
            <div class="movie-summary">${summary ? summary.replace(/<[^>]+>/g, "").substring(0, 100) + "..." : "Опис відсутній"}</div>
        `;

        moviesContainer.appendChild(movieCard);
    });
}

// Функція для заповнення фільтра жанрів
function populateGenreFilter(movies) {
    const genresSet = new Set();
    movies.forEach(movie => {
        movie.genres.forEach(genre => genresSet.add(genre));
    });

    allGenres = Array.from(genresSet).sort();

    allGenres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

// Функція для фільтрації фільмів
function filterMovies() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;

    let filtered = movies.filter(movie => {
        const matchesSearch = movie.name.toLowerCase().includes(searchTerm);
        const matchesGenre = !selectedGenre || movie.genres.includes(selectedGenre);
        return matchesSearch && matchesGenre;
    });

    displayMovies(filtered);
}

// Функції для сортування
function sortByName() {
    const sorted = [...movies].sort((a, b) => a.name.localeCompare(b.name));
    displayMovies(sorted);
}

function sortByRating() {
    const sorted = [...movies].sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0));
    displayMovies(sorted);
}

// Обробники подій
searchInput.addEventListener("input", filterMovies);
genreFilter.addEventListener("change", filterMovies);
sortNameBtn.addEventListener("click", sortByName);
sortRatingBtn.addEventListener("click", sortByRating);

// Ініціалізація
fetchMovies();