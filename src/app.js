let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
let minutes = now.getMinutes();

let dateTime = document.querySelector(".date-time");
dateTime.innerHTML = `${day}, ${hours}:${minutes}`;

function searchButton(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-form").value;
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = searchCity;
}

let form = document.querySelector(".d-flex");
form.addEventListener("submit", searchButton);

let temperatureCelsius = 17;
let temperatureDisplay = document.querySelector("h1");

function temperatureChange() {
  temperatureDisplay.innerHTML = convertToFahrenheit(temperatureCelsius);
}

function convertToCelsius(temperature) {
  return temperature;
}

function convertToFahrenheit(temperature) {
  return Math.round(temperature * 9) / 5 + 32;
}

let temperatureC = document.querySelector(".temperaturecelsius");
let temperatureF = document.querySelector(".temperaturefahrenheit");
temperatureF.addEventListener("click", temperatureChange);
temperatureC.addEventListener("click", function () {
  temperatureDisplay.innerHTML = temperatureCelsius;
});

function displayWeatherData(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;

  let temperatureDisplay = document.querySelector("h1");
  let cityNameDisplay = document.querySelector(".city-name");
  let description = document.querySelector(".weather-description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let precipitation = document.querySelector("#precipitation");

  temperatureDisplay.innerHTML = `${temperature}`;
  cityNameDisplay.innerHTML = cityName;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  precipitation.innerHTML = response.data.precipitation.value;
}

function getWeatherData(city) {
  let apiKey = "1859d3cd20a9227a4036fba0c473d146";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeatherData);
}

let button = document.querySelector(".btn");
button.addEventListener("click", function () {
  let cityInput = document.querySelector("#search-form").value;
  getWeatherData(cityInput);
});

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1859d3cd20a9227a4036fba0c473d146";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(function (response) {
    let temperature = Math.round(response.data.main.temp);
    let cityName = response.data.name;
    alert(`Current temperature in ${cityName}: ${temperature}°C`);
  });
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector(".bton");
locationButton.addEventListener("click", getCurrentPosition);
