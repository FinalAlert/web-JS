document.addEventListener('DOMContentLoaded', function() {
    const loadPokemonBtn = document.getElementById('loadPokemonBtn');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorContainer = document.getElementById('errorContainer');
    const pokemonContainer = document.getElementById('pokemonContainer');
    const pokemonImageContainer = document.getElementById('pokemonImageContainer');
    const pokemonInfoContainer = document.getElementById('pokemonInfoContainer');

    loadPokemonBtn.addEventListener('click', async function() {
        const pokemonNameOrId = prompt('Please enter Pokémon name or ID:');

        if (!pokemonNameOrId) {
            showError('No input provided. Please try again.');
            return;
        }

        try {
            showLoading();
            clearPreviousData();

            const pokemonData = await fetchPokemonData(pokemonNameOrId.toLowerCase());
            displayPokemonData(pokemonData);
        } catch (error) {
            showError(error.message);
        } finally {
            hideLoading();
        }
    });

    async function fetchPokemonData(nameOrId) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);

        if (!response.ok) {
            throw new Error('Pokémon not found. Please check the name or ID and try again.');
        }

        return await response.json();
    }

    function displayPokemonData(pokemon) {
        // Display image
        pokemonImageContainer.innerHTML = `
            <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}"
                 alt="${pokemon.name}">
        `;

        // Display info
        pokemonInfoContainer.innerHTML = `
            <div class="pokemon-info">
                <h2>${capitalizeFirstLetter(pokemon.name)}</h2>
                <div class="info-row">
                    <div class="info-label">ID:</div>
                    <div>${pokemon.id}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Height:</div>
                    <div>${pokemon.height / 10}m</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Weight:</div>
                    <div>${pokemon.weight / 10}kg</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Types:</div>
                    <div>${pokemon.types.map(type => `
                        <span class="type-badge" style="background-color: ${getTypeColor(type.type.name)}">
                            ${type.type.name}
                        </span>
                    `).join('')}</div>
                </div>
            </div>

            <div class="stats-container">
                <h3>Stats</h3>
                ${pokemon.stats.map(stat => `
                    <div class="stat-row">
                        <div class="stat-name">${formatStatName(stat.stat.name)}</div>
                        <div class="stat-value">${stat.base_stat}</div>
                        <div class="stat-bar-container">
                            <div class="stat-bar" style="width: ${Math.min(100, stat.base_stat)}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        pokemonContainer.style.display = 'block';
    }

    function showLoading() {
        loadingIndicator.style.display = 'block';
        loadPokemonBtn.disabled = true;
    }

    function hideLoading() {
        loadingIndicator.style.display = 'none';
        loadPokemonBtn.disabled = false;
    }

    function showError(message) {
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
        setTimeout(() => {
            errorContainer.style.display = 'none';
        }, 5000);
    }

    function clearPreviousData() {
        pokemonContainer.style.display = 'none';
        errorContainer.style.display = 'none';
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function formatStatName(statName) {
        return statName.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    function getTypeColor(type) {
        const typeColors = {
            normal: '#A8A878',
            fire: '#F08030',
            water: '#6890F0',
            electric: '#F8D030',
            grass: '#78C850',
            ice: '#98D8D8',
            fighting: '#C03028',
            poison: '#A040A0',
            ground: '#E0C068',
            flying: '#A890F0',
            psychic: '#F85888',
            bug: '#A8B820',
            rock: '#B8A038',
            ghost: '#705898',
            dragon: '#7038F8',
            dark: '#705848',
            steel: '#B8B8D0',
            fairy: '#EE99AC'
        };

        return typeColors[type] || '#777';
    }
});