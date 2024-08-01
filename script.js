// script.js
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

// Function to fetch weather details from API and display them
let getWeather = () => {
  let cityValue = cityRef.value;

  // If input field is empty
  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  } else {
    // If input field is NOT empty
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;


    // Clear the input field
    cityRef.value = "";

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.cod === 200) { // Check if the response is valid
          result.innerHTML = `
          <h2>${data.name}</h2>
          <h4 class="weather">${data.weather[0].main}</h4>
          <h4 class="desc">${data.weather[0].description}</h4>
          <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
          <h1>${data.main.temp} &#176;C</h1>
          <div class="temp-container">
              <div>
                  <h4 class="title">min</h4>
                  <h4 class="temp">${data.main.temp_min} &#176;C</h4>
              </div>
              <div>
                  <h4 class="title">max</h4>
                  <h4 class="temp">${data.main.temp_max} &#176;C</h4>
              </div>
          </div>
          `;
        } else {
          result.innerHTML = `<h3 class="msg">City not found</h3>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">An error occurred while fetching the weather data</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);
