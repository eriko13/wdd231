const API_KEY = config.WEATHER_API_KEY;
const CULIACAN_COORDS = { lat: 24.8079, lon: -107.3940 }; // Culiacan coordinates
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${CULIACAN_COORDS.lat}&lon=${CULIACAN_COORDS.lon}&units=imperial&appid=${API_KEY}`;
const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${CULIACAN_COORDS.lat}&lon=${CULIACAN_COORDS.lon}&units=imperial&cnt=24&appid=${API_KEY}`;
const MEMBERS_DATA_URL = 'data/members.json';

// Wait for DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData();
    fetchForecastData();
    loadMemberSpotlights();
});

/**
 * Fetches current weather data from OpenWeatherMap API
 */
async function fetchWeatherData() {
    try {
        const response = await fetch(WEATHER_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.querySelector('.current-weather').innerHTML = '<p>Weather data unavailable</p>';
    }
}

/**
 * Displays current weather data on the page
 */
function displayCurrentWeather(weatherData) {
    const currentTemp = document.getElementById('current-temp');
    const weatherDescription = document.getElementById('weather-description');
    const weatherIcon = document.getElementById('weather-icon');
    
    // Format temperature to have no decimal points
    currentTemp.textContent = Math.round(weatherData.main.temp);
    
    // Display all weather events if there are multiple
    if (weatherData.weather && weatherData.weather.length > 0) {
        const descriptions = weatherData.weather.map(event => {
            // Capitalize each word in the description
            return event.description.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        });
        
        weatherDescription.textContent = descriptions.join(', ');
        
        // Set weather icon for the first weather condition
        const iconCode = weatherData.weather[0].icon;
        weatherIcon.alt = weatherData.weather[0].description;
    }
}

/**
 * Fetches 3-day forecast data from OpenWeatherMap API
 */
async function fetchForecastData() {
    try {
        const response = await fetch(FORECAST_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        document.getElementById('forecast-container').innerHTML = '<p>Forecast data unavailable</p>';
    }
}

/**
 * Displays 3-day forecast data on the page
 */
function displayForecast(forecastData) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';
    
    // Get the forecast for noon (12:00) for the next three days
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of today
    
    // Find the forecasts for the next three days at noon
    const threeDayForecast = [];
    const processedDays = new Set();

    
    
    forecastData.list.forEach(forecast => {
        const forecastDate = new Date(forecast.dt * 1000);
        forecastDate.setHours(0, 0, 0, 0); // Set to beginning of the day
        
        // Skip if it's today or if we already have this day
        if (forecastDate.getTime() <= today.getTime() || processedDays.has(forecastDate.getTime())) {
            return;
        }
        
        // Check if this forecast is close to noon (between 11am and 1pm)
        const forecastHour = new Date(forecast.dt * 1000).getHours();
        if (forecastHour >= 11 && forecastHour <= 13) {
            threeDayForecast.push(forecast);
            processedDays.add(forecastDate.getTime());
            
            // Stop if we have three days
            if (threeDayForecast.length >= 3) {
                return;
            }
        }
    });
    
    // Display each day's forecast
    threeDayForecast.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-day');
        
        forecastCard.innerHTML = `
            <h4>${dayName}</h4>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].description}">
            <p>${Math.round(forecast.main.temp)}°F</p>
        `;
        
        forecastContainer.appendChild(forecastCard);
    });
}

/**
 * Loads and displays random gold/silver member spotlights
 */
async function loadMemberSpotlights() {
    try {
        const response = await fetch(MEMBERS_DATA_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        displayMemberSpotlights(data.members);
    } catch (error) {
        console.error('Error fetching member data:', error);
        document.getElementById('spotlights-container').innerHTML = '<p>Member data unavailable</p>';
    }
}

/**
 * Displays 2-3 random gold/silver member spotlights
 */
function displayMemberSpotlights(members) {
    const spotlightsContainer = document.getElementById('spotlights-container');
    spotlightsContainer.innerHTML = '';
    
    // Filter for gold or silver members (membership level 2 or 3)
    const eligibleMembers = members.filter(member => member.membershipLevel >= 2);
    
    // Shuffle the eligible members
    const shuffledMembers = shuffleArray(eligibleMembers);
    
    // Determine how many spotlights to show (2 or 3)
    const spotlightCount = Math.min(Math.floor(Math.random() * 2) + 2, shuffledMembers.length);
    
    // Display the selected spotlights
    for (let i = 0; i < spotlightCount; i++) {
        const member = shuffledMembers[i];
        
        const memberLevelText = member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member';
        
        const spotlightCard = document.createElement('div');
        spotlightCard.classList.add('spotlight-card');
        
        spotlightCard.innerHTML = `
            <div class="spotlight-image">
                <img src="images/${member.image}" alt="${member.name} Logo">
            </div>
            <div class="spotlight-info">
                <h3>${member.name}</h3>
                <p class="membership-level">${memberLevelText}</p>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank" class="website-link">Visit Website</a>
            </div>
        `;
        
        spotlightsContainer.appendChild(spotlightCard);
    }
}

/**
 * Shuffles array elements using Fisher-Yates algorithm
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
} 