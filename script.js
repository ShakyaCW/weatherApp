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



  function getWeatherData(cityCodesPromise) {
    cityCodesPromise.then(cityCodes => {
      cityCodes.forEach(cityCode => {
        const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74'; // Replace with your OpenWeatherMap API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=${API_KEY}`;
  
        const cacheKey = cityCode.toString();
        const cachedData = cache.get(cacheKey);
  
        // Check if the data is available in the cache and is within the valid time range (5 minutes)
        if (cachedData && Date.now() - cachedData.timestamp <= 300000) {
  
          // Serve the data from cache
          console.log('Serving data from cache for city code:', cityCode);
          displayWeatherData(cachedData.data);
  
          // Extract relevant information from the cached data
          const description = cachedData.weather[0].description;
          const temperature = cachedData.main.temp;
          const timestamp = cachedData.dt;
          const cityId = cachedData.id;
          const cityName = cachedData.name;
          const celcius = Math.round(temperature - 273);
  
          console.log('City:', cityName);
          console.log('City ID:', cityId);
          console.log('Weather Description:', description);
          console.log('Temperature:', temperature);
          console.log('Timestamp:', timestamp);
          console.log('-------------------------');
  
          // Create a weather element and add it to the DOM
          const weatherEl = document.createElement('div');
          weatherEl.classList.add('weather');
  
          weatherEl.innerHTML = `
            <div class="container">
              <h1 class="heading">${cityName}</h1>
              <div class="box-container">
                  <div class="box">
                      <h1>${celcius} °c</h1>
                      <h3> ${description} </h3>
                      <Button class="btn" id="${cityId}">find more</Button>
                  </div>
              </div>
            </div>
          `;
  
          main.appendChild(weatherEl);
  
          // Add event listener for the "find more" button
          document.getElementById(cityId).addEventListener('click', () => {
            openNav(cityId);
          });
        }
  
        else {
          // Fetch the weather data from the API
          fetch(apiUrl)
            .then(response => response.json())
            .then(jsonData => {
              // Extract relevant information from the fetched data
              const description = jsonData.weather[0].description;
              const temperature = jsonData.main.temp;
              const timestamp = jsonData.dt;
              const cityId = jsonData.id;
              const cityName = jsonData.name;
              const celcius = Math.round(temperature - 273);
  
              console.log('City:', cityName);
              console.log('City ID:', cityId);
              console.log('Weather Description:', description);
              console.log('Temperature:', temperature);
              console.log('Timestamp:', timestamp);
              console.log('-------------------------');
  
              // Create a weather element and add it to the DOM
              const weatherEl = document.createElement('div');
              weatherEl.classList.add('weather');
  
              weatherEl.innerHTML = `
                <div class="container">
                  <h1 class="heading">${cityName}</h1>
                  <div class="box-container">
                      <div class="box">
                          <h1>${celcius} °c</h1>
                          <h3> ${description} </h3>
                          <Button class="btn" id="${cityId}">find more</Button>
                      </div>
                  </div>
                </div>
              `;
  
              main.appendChild(weatherEl);
  
              // Add event listener for the "find more" button
              document.getElementById(cityId).addEventListener('click', () => {
                console.log(cityId);
                openNav(cityId);
              });
            })
            .catch(error => console.error('Error:', error));
        }
      });
    });
  }