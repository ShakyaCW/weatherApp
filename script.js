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