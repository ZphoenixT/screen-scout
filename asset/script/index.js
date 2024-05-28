'use strict';

console.log("JS File");

import movies from "./data/movieData.js";

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector(".searchButton");
    const movieSearchInput = document.querySelector(".movieSearch");
    const movieTitleElement = document.querySelector(".MovieTitle");
    const movieTimeElement = document.querySelector(".Mtime");
    const movieYearElement = document.querySelector(".Myear");
    const movieGenreElement = document.querySelector(".Mgenre");
    const autocompleteDropdown = document.querySelector(".autocomplete");
    const movieBox = document.querySelector(".Movie");

    const movieTitles = movies.map(movie => movie.title);

    searchButton.disabled = true;

    searchButton.addEventListener("click", () => {
        const movieName = movieSearchInput.value.trim().toLowerCase();
        const movie = movies.find(m => m.title.toLowerCase().includes(movieName));

        if (movie) {
            movieTitleElement.textContent = movie.title;
            movieTimeElement.textContent = movie.runningTime;
            movieYearElement.textContent = movie.year;
            movieGenreElement.textContent = movie.genre.join(', '); 
            document.querySelector(".movieDescription").textContent = movie.description;
            document.querySelector(".MovieImage").style.backgroundImage = `url(${movie.poster})`;
            movieBox.style.display = "inline";
        }
    });

    function updateAutocompleteDropdown(inputValue) {
        const filteredMovies = movieTitles.filter(title => title.toLowerCase().includes(inputValue.toLowerCase()));
        autocompleteDropdown.innerHTML = "";

        filteredMovies.forEach(title => {
            const option = document.createElement("div");
            option.textContent = title;
            option.classList.add("autocomplete-option");
            autocompleteDropdown.appendChild(option);
        });

        if (filteredMovies.length > 0) {
            autocompleteDropdown.style.display = "block";
        } else {
            autocompleteDropdown.style.display = "none";
        }
    }

    movieSearchInput.addEventListener("input", () => {
        const inputValue = movieSearchInput.value.trim();

        searchButton.disabled = inputValue.length === 0;

        if (inputValue.length >= 3) {
            updateAutocompleteDropdown(inputValue);
        } else {
            autocompleteDropdown.innerHTML = "";
            autocompleteDropdown.style.display = "none";
        }
    });

    autocompleteDropdown.addEventListener("click", (event) => {
        if (event.target.classList.contains("autocomplete-option")) {
            movieSearchInput.value = event.target.textContent;
            autocompleteDropdown.innerHTML = "";
            autocompleteDropdown.style.display = "none";
            searchButton.disabled = false;
        }
    });
});
