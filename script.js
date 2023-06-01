const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74';

// Create a Map to store the cached data
const cache = new Map();

// Function to extract city codes from cities.json
async function extractCityCodes() {
  try {
    const response = await fetch('cities.json');
    const data = await response.json();
    // Extract and return city codes from the data
    return data.List.map(city => city.CityCode);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the extractCityCodes function and store the result in a variable
const cityCodesPromise = extractCityCodes();

// Fetch weather data for each city code and store in the cache
cityCodesPromise.then(cityCodes => {
    cityCodes.forEach(cityCode => {
      // Create the API URL for each city code
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=${API_KEY}`;
  
      // Fetch the weather data for the city code
      fetch(apiUrl)
        .then(response => response.json())
        .then(jsonData => {
          // Store the data in the cache using city code as the key
          cache.set(cityCode, jsonData);
  
          console.log(`Data fetched and stored for city code ${cityCode}`);
        })
        .catch(error => console.error('Error:', error));
    });
  });
  
  // Access the cityCodes array outside the function
  cityCodesPromise.then(cityCodes => {
    console.log(cityCodes);
  });
  
  // Variables for tracking cache status
  let cachedCounter = 0; // Counter to track the number of cached entries
  let cachedTime = 0; // Timestamp to track the time of caching