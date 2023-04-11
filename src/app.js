function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function displayWeatherData(response) {
  let temperature = Math.round(response.data.temperature.current);
  let cityName = response.data.city;

  let temperatureDisplay = document.querySelector("h1");
  let cityNameDisplay = document.querySelector(".city-name");
  let description = document.querySelector(".weather-description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateTime = document.querySelector(".date-time");
  let weatherIcon = document.querySelector("#weathericon");
  let cityImages = document.querySelector("#cityimages");

  temperatureDisplay.innerHTML = `${temperature}`;
  cityNameDisplay.innerHTML = cityName;
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  dateTime.innerHTML = formatDate(response.data.time * 1000);
  weatherIcon.src = response.data.condition.icon_url;
}
let defaultCity = "Lisbon";

function search(city) {
  let apiKey = "ef8052b94656b6atac9cfoe91360155a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherData);
}

search(defaultCity);

function getWeatherData(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=ef8052b94656b6atac9cfoe91360155a&units=metric`;

  axios.get(apiUrl).then((response) => {
    displayWeatherData(response);
    getPhoto(city);
  });
}

let button = document.querySelector(".btn");
button.addEventListener("click", function (event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-form").value;
  getWeatherData(cityInput);
});

function getPhoto(city) {
  const unsplashAPIKey = "JZ39qbuaPz_ARiywLmlBbngqBCVSccJE2lJBHesySCY";
  const query = encodeURIComponent(`${city} city`);
  const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${unsplashAPIKey}`;

  axios.get(url).then((response) => {
    const imageUrl = response.data.urls.regular;
    const imageAlt = response.data.alt_description;
    const imageElement = document.getElementById("cityimages");

    imageElement.setAttribute("src", imageUrl);
    imageElement.setAttribute("alt", imageAlt);
  });
}
getPhoto("Lisbon");
