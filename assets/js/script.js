// Declared variables
const API_KEY = '9d51f243a672598006179ae1583751b8';
const fetchButton = document.getElementById('submit');
const url = 'https://api.openweathermap.org/data/2.5/';
const userSearch = document.getElementById("userSearch");
const cityName = document.getElementById("city-date");
const icon = document.getElementById("icon");
const temp = document.getElementById("temp");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");

function getApi() {
  
  let search = userSearch.value; 
 
// This api request is for getting the current weather conditions of a specific city 
  fetch(`${url}weather?q=${search}&units=imperial&appid=${API_KEY}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.name)
      console.log(data.main.temp)
      console.log(data.main.humidity)
      console.log(data.wind.speed)
      console.log(data.weather[0].icon)

      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const weatherimg = data.weather[0].icon;
      const date = dayjs(data.dt * 1000).format("M/DD/YYYY");

      cityName.textContent = data.name + " " + "(" + date + ")"; 
      temp.textContent = "Temp: " + data.main.temp + "° F";
      wind.textContent = "Wind Speed: " + data.wind.speed + " MPH"
      humidity.textContent = "Humidity: " + data.main.humidity + "%";
      icon.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherimg + ".png");
      icon.setAttribute("style", "width: 6rem", "height: 6rem");

// This api request fetches the data for the 5 day forecast  
  fetch(`${url}forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
  
  }); 
}

fetchButton.addEventListener('click', getApi);
