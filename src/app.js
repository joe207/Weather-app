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

let temperatureCelsius = 0;
let temperatureDisplay = document.querySelector("h1");

function temperatureChange() {
  temperatureDisplay.innerHTML = convertToFahrenheit(temperatureCelsius) + "°F";
}

function convertToCelsius(temperature) {
  return temperature;
}

function convertToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

let temperatureC = document.querySelector(".temperaturecelsius");
let temperatureF = document.querySelector(".temperaturefahrenheit");
temperatureF.addEventListener("click", temperatureChange);
temperatureC.addEventListener("click", function () {
  temperatureDisplay.innerHTML = temperatureCelsius + "°C";
});

function displayWeatherData(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;

  let temperatureDisplay = document.querySelector("h1");
  let cityNameDisplay = document.querySelector(".city-name");

  temperatureDisplay.innerHTML = `${temperature.toFixed(1)}°C`;
  cityNameDisplay.innerHTML = cityName;
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

function getCityImages(images) {
  let apiKey = `AIzaSyCFshgR-SbNU3evKlojV1Fsvluzs2FrX2U`;
  let apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Chicago,IL&key=${apiKey}&inputtype=textquery&fields=name,photos`;
  console.log(images);
  axios.get(apiUrl).then();
}
