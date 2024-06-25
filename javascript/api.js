document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'dedac08caf544ba8b1d684584e101fc2'; // Substitua pela sua chave de API da RAWG

    const platformSelect = document.getElementById('platform-select');
    let selectedPlatformId = platformSelect.value;

    platformSelect.addEventListener('change', () => {
        selectedPlatformId = platformSelect.value;
        fetchGamesByPlatform(selectedPlatformId);
    });

    const fetchGamesByPlatform = async (platformId) => {
        const platformGamesEndpoint = `https://api.rawg.io/api/games?key=${apiKey}&platforms=${platformId}&dates=2020-01-01,2024-01-01&ordering=-rating&page_size=50`;

        try {
            const response = await fetch(platformGamesEndpoint);
            if (!response.ok) {
                throw new Error(`Erro ao buscar jogos da plataforma: ${response.status}`);
            }
            const data = await response.json();
            displayGames(data.results);
        } catch (error) {
            console.error(`Erro ao buscar jogos da plataforma (${platformId}):`, error);
        }
    };

    const displayGames = (games) => {
        const gamesContainer = document.getElementById('games-container');
        gamesContainer.innerHTML = '';

        games.forEach(game => {
            const gameElement = document.createElement('div');
            gameElement.classList.add('game');
            gameElement.innerHTML = `
                <img src="${game.background_image}" alt="${game.name}">
                <div class="game-info">
                    <h3>${game.name}</h3>
                    <p><strong>Data de Lançamento:</strong> ${game.released}</p>
                    <p><strong>Avaliação:</strong> ${game.rating}/5</p>
                </div>
            `;
            gamesContainer.appendChild(gameElement);
        });
    };

    // Inicialmente buscar jogos da plataforma selecionada
    fetchGamesByPlatform(selectedPlatformId);
});
