// Defina sua chave de API aqui
const apiKey = 'dada49af77a411f06b9296be033b1ba6'; // Substitua pela sua chave da OpenWeatherMap

// Seletores dos elementos HTML
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weather-icon');
const errorMessage = document.getElementById('error-message');

// Função para buscar o clima
async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            throw new Error('Cidade não encontrada');
        }

        // Exibir as informações do clima
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        // Mostrar a seção de informações do clima
        weatherInfo.style.display = 'block';
        errorMessage.style.display = 'none';
    } catch (error) {
        // Exibir mensagem de erro
        weatherInfo.style.display = 'none';
        errorMessage.style.display = 'block';
        errorMessage.textContent = error.message;
    }
}

// Evento de clique no botão de busca
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Por favor, insira o nome de uma cidade.';
    }
});

// Permite buscar o clima ao pressionar Enter
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    }
});