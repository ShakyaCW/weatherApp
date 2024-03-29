const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74';

// Create a Map to store the cached data
const cache = new Map();
// Variables for tracking cache status
let currentTime = 0;
let lastUpdatedTime = 0;


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
const extractedCityCodes = extractCityCodes();

// Function to update the cache
function updateCache(){
// Fetch weather data for each city code and store in the cache
extractedCityCodes.then(cityCodes => {
    cityCodes.forEach(cityCode => {
      // Create the API URL for each city code
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=${API_KEY}`;
  
      // Fetch the weather data for the city code
      fetch(apiUrl)
        .then(response => response.json())
        .then(jsonData => {
          // Store the data in the cache using city code as the key
          cache.set(cityCode, jsonData);
          lastUpdatedTime = new Date();
          
  
          console.log(`Data fetched and stored for city code ${cityCode}`);
        })
        .catch(error => console.error('Error:', error));
    });
  });}


  
  


  function getWeatherData(extractedCityCodes) {
    extractedCityCodes.then(cityCodes => {
      cityCodes.forEach(cityCode => {
        const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=${API_KEY}`;
  
          // Fetch the weather data from the API
          fetch(apiUrl)
            .then(response => response.json())
            .then(jsonData => {
              cache.set(cityCode, jsonData);
              lastUpdatedTime = new Date();
              
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
                openOverlay(cityId);
              });
            })
            .catch(error => console.error('Error:', error));
        
      });
    });
  }




// Call the function with extractedCityCodes
getWeatherData(extractedCityCodes);

const overlayContent = document.getElementById('overlay-content');

/* Open when someone clicks on the 'Find More' button */
function openOverlay(idOfCity) {
  
  currentTime = new Date();

  // Create a new Date object representing the specific time plus five minutes
  const cachedTimePlusFiveMinutes = new Date(lastUpdatedTime.getTime() + 5 * 60000);
  let id = idOfCity;

  const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${idOfCity}&appid=${API_KEY}`;

  const cacheKey = idOfCity.toString();
  const cachedData = cache.get(cacheKey);
  console.log(cachedData);

  // Checking if cached data is expired or not. This if block runs if cached data is not expired.
  if (cache && currentTime.getTime() < cachedTimePlusFiveMinutes.getTime()) {
    document.getElementById("myNav").style.width = "100%";
    console.log("---------------Loading using cached data------------------");

    // Extract relevant information from the cached data
    const description = cachedData.weather[0].description;
    const temperature = cachedData.main.temp;
    const timestamp = cachedData.dt;
    const cityId = cachedData.id;
    const cityName = cachedData.name;
    const celcius = Math.round(temperature - 273);
    const fahrenheit = Math.round((temperature - 273.15) * 9 / 5 + 32);
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[month];
    const year = currentDate.getFullYear();
    const tempMin = cachedData.main.temp_min;
    const tempMax = cachedData.main.temp_max;
    const pressure = cachedData.main.pressure;
    const humidity = cachedData.main.humidity;
    const sunriseTime = new Date(cachedData.sys.sunrise * 1000 + cachedData.timezone * 1000 - 19800 * 1000).toLocaleTimeString();
    const sunsetTime = new Date(cachedData.sys.sunset * 1000 + cachedData.timezone * 1000 - 19800 * 1000).toLocaleTimeString();
    const country = cachedData.sys.country;
    const timeZoneOffset = cachedData.timezone; // Offset in seconds
    const currentTime = new Date(currentDate.getTime() + timeZoneOffset * 1000 - 19800 * 1000);
    // Remove the time zone offset from the current time
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };

    const formattedTime = currentTime.toLocaleString('en-US', options);
    const day = currentTime.getDate();

    console.log('City:', cityName);
    console.log('City ID:', cityId);
    console.log('Weather Description:', description);
    console.log('Temperature:', temperature);
    console.log('Timestamp:', timestamp);
    console.log('-------------------------');

    // Update the overlay content with the cached weather data
    overlayContent.innerHTML = `
      <div class="wrapper">
        <div class="widget-container">
          <div class="top-left">
            <h1 class="city" id="city">${cityName}, ${country}</h1>
            <h2 id="day">${formattedTime}</h2>
            <h3 id="date"></h3>
            <h3 id="time">${day}/${monthName}/${year}</h3>
            <p class="geo"></p>
          </div>
          <div class="top-right">
            <h1 id="weather-status">${description}</h1>
            <img class="weather-icon" src="https://myleschuahiock.files.wordpress.com/2016/02/sunny2.png">
          </div>
          <div class="horizontal-half-divider"></div>
          <div class="bottom-left">
            <h1 id="temperature">${celcius}</h1>
            <h2 id="celsius">&degC</h2>
            <h2 id="temp-divider">/</h2>
            <h2 id="fahrenheit">${fahrenheit}&degF</h2>
          </div>
          <div class="vertical-half-divider"></div>
          <div class="bottom-right">
            <div class="other-details-key">
              <p>Temp Min</p>
              <p>Temp Max</p>
              <p>Pressure</p>
              <p>Humidity</p>
              <p>Sunrise Time</p>
              <p>Sunset Time</p>
            </div>
            <div class="other-details-values">
              <p class="windspeed">${Math.round(tempMin - 273)} &degC</p>
              <p class="humidity">${Math.round(tempMax - 273)} &degC</p>
              <p class="pressure">${pressure} hPa</p>
              <p class="sunrise-time">${humidity}%</p>
              <p class="sunset-time">${sunriseTime}</p>
              <p class="sunset-time">${sunsetTime}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    console.log("-------------Loading New Data----------------");
    fetch(apiUrl)
      .then(response => response.json())
      .then(jsonData => {
        if (jsonData) {
          document.getElementById("myNav").style.width = "100%";

          // Extract relevant information from the API response
          const description = jsonData.weather[0].description;
          const temperature = jsonData.main.temp;
          const timestamp = jsonData.dt;
          const cityId = jsonData.id;
          const cityName = jsonData.name;
          const celcius = Math.round(temperature - 273);
          const fahrenheit = Math.round((temperature - 273.15) * 9 / 5 + 32);
          const currentDate = new Date();
          const month = currentDate.getMonth();
          const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const monthName = monthNames[month];
          const year = currentDate.getFullYear();
          const tempMin = jsonData.main.temp_min;
          const tempMax = jsonData.main.temp_max;
          const pressure = jsonData.main.pressure;
          const humidity = jsonData.main.humidity;
          const sunriseTime = new Date(jsonData.sys.sunrise * 1000 + cachedData.timezone * 1000 - 19800 * 1000).toLocaleTimeString();
          const sunsetTime = new Date(jsonData.sys.sunset * 1000 + cachedData.timezone * 1000 - 19800 * 1000).toLocaleTimeString();
          const country = cachedData.sys.country;
          const timeZoneOffset = cachedData.timezone; // Offset in seconds
          const currentTime = new Date(currentDate.getTime() + timeZoneOffset * 1000 - 19800 * 1000);
          // Remove the time zone offset from the current time
          const options = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          };

          const formattedTime = currentTime.toLocaleString('en-US', options);
          const day = currentTime.getDate();

          console.log('City:', cityName);
          console.log('City ID:', cityId);
          console.log('Weather Description:', description);
          console.log('Temperature:', temperature);
          console.log('Timestamp:', timestamp);
          console.log('-------------------------');

          // Update the overlay content with the API weather data
          overlayContent.innerHTML = `
            <div class="wrapper">
              <div class="widget-container">
                <div class="top-left">
                  <h1 class="city" id="city">${cityName}, ${country}</h1>
                  <h2 id="day">${formattedTime}</h2>
                  <h3 id="date"></h3>
                  <h3 id="time">${day}/${monthName}/${year}</h3>
                  <p class="geo"></p>
                </div>
                <div class="top-right">
                  <h1 id="weather-status">${description}</h1>
                  <img class="weather-icon" src="https://myleschuahiock.files.wordpress.com/2016/02/sunny2.png">
                </div>
                <div class="horizontal-half-divider"></div>
                <div class="bottom-left">
                  <h1 id="temperature">${celcius}</h1>
                  <h2 id="celsius">&degC</h2>
                  <h2 id="temp-divider">/</h2>
                  <h2 id="fahrenheit">${fahrenheit}&degF</h2>
                </div>
                <div class="vertical-half-divider"></div>
                <div class="bottom-right">
                  <div class="other-details-key">
                    <p>Temp Min</p>
                    <p>Temp Max</p>
                    <p>Pressure</p>
                    <p>Humidity</p>
                    <p>Sunrise Time</p>
                    <p>Sunset Time</p>
                  </div>
                  <div class="other-details-values">
                    <p class="windspeed">${Math.round(tempMin - 273)} &degC</p>
                    <p class="humidity">${Math.round(tempMax - 273)} &degC</p>
                    <p class="pressure">${pressure} hPa</p>
                    <p class="sunrise-time">${humidity}%</p>
                    <p class="sunset-time">${sunriseTime}</p>
                    <p class="sunset-time">${sunsetTime}</p>
                  </div>
                </div>
              </div>
            </div>
          `;
        }
      });
      updateCache();
  }
}

/* Close when clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

// End of the code