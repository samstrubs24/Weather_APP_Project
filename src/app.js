let date = new Date();
let hours = date.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}
let hour = date.getHours();
if (hour >= 12) {
  hour = hours - 12;
  hourTime = "PM";
}
if (hour < 0) {
  h = 12;
}

let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
let day = days[date.getDay()];
let dateElement = document.querySelector("#update");
dateElement.innerHTML = ` Last updated:${day}, ${hour}: ${minutes} ${hourTime}`;

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let describeElement = document.querySelector("#descript");
  describeElement.innerHTML = response.data.weather[0].main;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let humidityElement = document.querySelector("#humidity");
  let hum = response.data.main.humidity;
  humidityElement.innerHTML = `Humidity:${hum}%`;
  let windElement = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind Speed: ${wind} mph`;
  let weatherIconElement = document.querySelector("#img1");
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemp = response.data.main.temp;
}

function search(city) {
  let apiKey = "a81ad5e4475c2b1dbce4aaa38b89d9cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handle(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  search(cityInput.value);
}

function displayFahrenTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("celsius");
  fahrenLink.classList.add("celsius");
  let tempElement = document.querySelector("#temp");
  let fahrenTemperature = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("celsius");
  fahrenLink.classList.remove("celsius");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handle);

let fahrenLink = document.querySelector("#fahren");
fahrenLink.addEventListener("click", displayFahrenTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);
