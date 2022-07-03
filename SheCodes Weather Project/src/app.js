let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let display = `${day} ${hours}:${minutes}`;
let date = document.querySelector("#display-time");
date.innerHTML = `${display}`;

function displayWeather(response) {
  document.querySelector(
    "#currentDisplayTemperature"
  ).innerHTML = `${Math.round(response.data.main.temp)}°C`;
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function search(city) {
  let apiKey = "28da7852e0ace951fd98245728509e42";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  let place = document.querySelector("#location");
  place.innerHTML = `${city.value}`;
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function showDisplayTemperature(response) {
  let displayTemp = Math.round(response.data.main.temp);
  let dashboardTemp = document.querySelector("#currentDisplayTemperature");
  dashboardTemp.innerHTML = `${displayTemp}°C`;
  let displayName = document.querySelector("#location");
  displayName.innerHTML = `${response.data.name}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let key = "28da7852e0ace951fd98245728509e42";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(showDisplayTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#geolocation");
button.addEventListener("click", getCurrentPosition);

search("Rome");
