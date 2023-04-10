// Declared variables //
const API_KEY = '9d51f243a672598006179ae1583751b8';
const fetchButton = document.getElementById('submit');
const url = 'https://api.openweathermap.org/data/2.5/';
const url2 = `https://api.openweathermap.org/geo/1.0/direct?q=`
const searchHistory = document.getElementById("searchHistory");
const cityName = document.getElementById("city-date");
const icon = document.getElementById("icon");
const temp = document.getElementById("temp");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const aside = document.getElementById("aside");
const main = document.getElementById("main");
const forecast = document.getElementById("forecast");
const day0 = document.getElementById("day1");
const day1 = document.getElementById("day2");
const day2 = document.getElementById("day3");
const day3 = document.getElementById("day4");
const day4 = document.getElementById("day5");
const clear = document.getElementById("clear");
const stateMenu = document.getElementById("stateMenu");
let userSearch = document.getElementById("userSearch");
let country = document.getElementById("country");
let state = document.getElementById("state");
let buttonHist = JSON.parse(localStorage.getItem("searchHist"));
let cityFound = true;
let country1 = country.value;
let state1 = state.value;
let apiCall = "";
let bannerText = "";
let search = "";
let previousSearch = false;
let apiCall2 = "";

// This function makes the state selction menu visible if US selected as the country // 
function showStateMenu() {
  if (country.value === "US") {
    stateMenu.setAttribute("style", "display: block;");
  } else {
    stateMenu.setAttribute("style", "display: none;")
    state.value = "";
  }
}

// This event listener calls the showStateMenu() if a different country is selected //
country.addEventListener("click", (e) => {
  showStateMenu();
})

// Function is called when page is loaded //
showStateMenu();

// This is the main function for the app //
// It makes 3 different api calls to generate the content on the page //
function getApi() {

  search = userSearch.value; 
  country1 = country.value;
  state1 = state.value;

  // alert user if the search field is empty //
  if (search === "" && previousSearch === false) {
    alert("Please enter a valid city name.")
    return
  }

  // The next two if statements determine what the url for api request should be //
  // Is based on both user input as well as locally stored data from previous searches //
  if (state.value === "") {
    apiCall = `${url2}${search},${country1}&units=imperial&appid=${API_KEY}`;
  } else {
    apiCall = `${url2}${search},${state1},${country1}&units=imperial&appid=${API_KEY}`;
  }

  if (previousSearch === true) {
    weather = apiCall2;
  } else {
    weather = apiCall;
  }

// This api request is for getting the latitude and longitude of the querried city //
  fetch(weather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
       
        // If the api request return null/undefined alert message is displayed //
        if (data.length === 0) {
          alert("City not found, please try again.")
          cityFound = false;
          userSearch.value = "";
          return;
        }
      
      // If the country is not set to US the current weather header is modified // 
      if (state.value === "") {
        bannerText = "Currently in " + data[0].name + ", " + data[0].country + ", ";
      } else {
        bannerText = "Currently in " + data[0].name + ", " + data[0].state + ", " + data[0].country + ", ";
      }

      let lat = data[0].lat;
      let lon = data[0].lon;
  
  // This api request takes the lat and lon from the previous api and returns //
  // current weather conditions for that city //
  fetch(`${url}weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data2) {
      const date = dayjs(data2.dt * 1000).format("M/DD/YYYY");
      cityName.textContent = bannerText + "(" + date + ")";
      fiveDayForecast = [];
      const weatherimg = data2.weather[0].icon;
      temp.textContent = "Temp: " + data2.main.temp + "° F";
      wind.textContent = "Wind Speed: " + data2.wind.speed + " MPH";
      humidity.textContent = "Humidity: " + data2.main.humidity + "%";
      icon.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherimg + ".png");
      icon.setAttribute("style", "width: 6rem", "height: 6rem");
    })

  // This api request fetches the data for the 5 day forecast //
  // Also by means of the lat and lon from the first api call // 
  fetch(`${url}forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (weather) {
      weather.list.forEach(function (item, index) {
        if ((index + 1) % 8 === 0) {
          fiveDayForecast.push(item);
        }
      });

      day0.innerHTML = "";
      day1.innerHTML = "";
      day2.innerHTML = "";
      day3.innerHTML = "";
      day4.innerHTML = "";
      
      fiveDayForecast.splice(5);

      // This next span of code creates the cards for each day in the 5 day forecast //
      for (i = 0; i < fiveDayForecast.length; i++) {

      const futureDay = eval("day" + i);
      
      // creates and styles the date header //
      futureDay.classList.add("thumbnail");
      const h1 = document.createElement("h3");
      h1.textContent = dayjs(fiveDayForecast[i].dt * 1000).format("M/DD/YYYY");
      h1.setAttribute("style", "text-align: center");
      futureDay.appendChild(h1);

      // creates and styles the weather icon image //
      const icon1 = document.createElement("img");
      icon1.setAttribute("src", "https://openweathermap.org/img/wn/" + fiveDayForecast[i].weather[0].icon + ".png")
      icon1.setAttribute("style", "width: 4rem", "height: 4rem");
      icon1.classList.add("centerImg");
      futureDay.appendChild(icon1);

      // creates and styles the expected temperature text //
      const temp1 = document.createElement("p");
      const spanTemp1 = document.createElement("span");
      spanTemp1.classList.add("yellow");
      spanTemp1.textContent = "Temp: ";
      futureDay.appendChild(spanTemp1);
      temp1.textContent = fiveDayForecast[i].main.temp + " °F";
      futureDay.appendChild(temp1);

      // creates and styles the expected wind speed text //
      const wind1 = document.createElement("p");
      const spanWind1 = document.createElement("span");
      spanWind1.classList.add("yellow");
      spanWind1.textContent = "Wind: ";
      futureDay.appendChild(spanWind1);
      wind1.textContent = fiveDayForecast[i].wind.speed + " MPH";
      futureDay.appendChild(wind1);

      // creates and styles the expected humidity text //
      const humidity1 = document.createElement("p");
      const spanHumidity1 = document.createElement("span");
      spanHumidity1.classList.add("yellow");
      spanHumidity1.textContent = "Humidity: ";
      futureDay.appendChild(spanHumidity1);
      humidity1.textContent = fiveDayForecast[i].main.humidity + "%";
      futureDay.appendChild(humidity1);
      }
    })

    // The following if state is used to determine if the renderSearch() //
    // and the storeSearch() functions need to be ran //
    // based on whether or not the getApi() was called through user input //
    // or if it was called through a search history button. //
    // Also resets certain variables //
    if (previousSearch === true) {
      aside.classList.remove("aside");
      aside.classList.add("aside2");
      main.setAttribute("style", "display: flex;");
      forecast.setAttribute("style", "display: block;");
      userSearch.value = "";
      previousSearch = false;
      previouslySearchedState = "";
      return;
    } else {
      buttonHist.unshift([apiCall, search, state1, country1]);
      storeSearch();
      renderSearch();
      aside.classList.remove("aside");
      aside.classList.add("aside2");
      main.setAttribute("style", "display: flex;");
      forecast.setAttribute("style", "display: block;");
      userSearch.value = "";
      previousSearch = false;
    }
  }); 
}

// This function creates buttons containing the information from //
// previous searches necessary to run the search again if desired //
const renderSearch = function () {
  
  // Stops the function form running if a city was not found //
  if (cityFound === false) {
    return;
  }

  searchHistory.innerHTML = "";

  // Runs through the local storage item buttonHist and creates buttons for each item //
  if (buttonHist !== null) {
    buttonHist.forEach(function ([apiCall, search, state1, country1]) {
      const oldSearch = document.createElement("button");
      oldSearch.textContent = search; 
      oldSearch.value = apiCall;
      oldSearch.classList.add("button2");
      // Adds an event listener to each old search button that sets variable values and calls the getApi() //
      oldSearch.addEventListener('click', (e) => {
        apiCall2 = e.target.value;
        previousSearch = true;
        state.value = state1;
        country.value = country1;
        getApi();
        aside.classList.remove("aside");
        aside.classList.add("aside2");
        main.setAttribute("style", "display: flex;");
        forecast.setAttribute("style", "display: block;");
      })
      searchHistory.appendChild(oldSearch);
      clear.setAttribute("style", "display: block;");
    });
  } else {
    buttonHist = [];
  }
};

// Calls function when page is loaded //
renderSearch();

// This function sets a local storage item for user searches //
const storeSearch = function () {
  localStorage.setItem("searchHist", JSON.stringify(buttonHist));
};

// Adds an event listener to the search button that launches the apps primary function getApi() //
fetchButton.addEventListener('click', (e) => {
cityFound = true;
getApi();
buttonHist.splice(4);
});

// This event listener is on a button that provides the user the option //
// of clearing the previous search history, if they so desire. //
clear.addEventListener("click", e => {
  localStorage.clear();
  searchHistory.innerHTML = "";
  clear.setAttribute("style", "display: none;");
  buttonHist = [];
  aside.classList.remove("aside2");
  aside.classList.add("aside");
  main.setAttribute("style", "display: none;");
  forecast.setAttribute("style", "display: none;");
})