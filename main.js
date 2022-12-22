const apikey = "";

const searchbox = document.querySelector('.search-box');
const button = document.getElementById("submit");

searchbox.addEventListener('keypress', setQuery);
button.addEventListener("click", () => getResults(searchbox.value));

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(value) {
  if (isNaN(value)) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=imperial&APPID=${apikey}`)
      .then(weather => weather.json())
      .then(displayResults)
  } else {
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${value}&units=imperial&APPID=${apikey}`)
      .then(weather => weather.json())
      .then(displayResults)
  }
}

function displayResults(weather) {

if(`${weather.message}` == 'city not found'){
    alert('Error Location Not Found');
}

  let location = document.querySelector('.location .city');
  location.innerHTML = `<h3>Weather in ${weather.name}, ${weather.sys.country}</h3>`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = currentDate(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = 'Current Weather:  ' + weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `High: ${Math.round(weather.main.temp_max)}°F - Low: ${Math.round(weather.main.temp_min)}°F`;

  let windspeed = document.querySelector('.wind-speed');
  windspeed.innerText = `Wind-Speed:   ` + weather.wind.speed + `mph`;

  let coords = document.querySelector('.coords');
  coords.innerText = `Coordinates: [` + weather.coord.lat + ',' + weather.coord.lon + `]`;

  let sunrise = document.querySelector('.sunrise');
  sunrise.innerText = 'sunrise:  ' + format_time(weather.sys.sunrise) + ' UTC';

  let sunset = document.querySelector('.sunset');
  sunset.innerText = 'sunset:  ' + format_time(weather.sys.sunset) + ' UTC';

  displayLocation({
    coords: {
      latitude: weather.coord.lat,
      longitude: weather.coord.lon
    }
  });

}

function format_time(s) {
  return new Date(s * 1e3).toISOString().slice(-13, -5);
}

console.log( format_time(12345) );  // "03:25:45"

function currentDate(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${month} ${date}, ${year}`;
}
