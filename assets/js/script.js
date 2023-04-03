const API_KEY = '9d51f243a672598006179ae1583751b8';
const fetchButton = document.getElementById('submit');
const url = 'https://api.openweathermap.org/data/2.5/';
const url2 ='http://api.openweathermap.org/geo/1.0/';
const userSearch = document.getElementById("userSearch");

function getApi() {
  
  let search = userSearch.value; 

  fetch(`${url2}direct?q=${search}&appid=${API_KEY}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data[0].lat)
      console.log(data[0].lon)
    })

  console.log(search);

  fetch(`${url}weather?q=${search}&appid=${API_KEY}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.name)
      console.log(data.main.temp)
      console.log(data.main.humidity)
      console.log(data.wind.speed)
      console.log(data.weather[0].icon)


    //   //Loop over the data to generate a table, each table row will have a link to the repo url
    //   for (var i = 0; i < data.length; i++) {
    //     // Creating elements, tablerow, tabledata, and anchor
    //     var createTableRow = document.createElement('tr');
    //     var tableData = document.createElement('td');
    //     var link = document.createElement('a');

    //     // Setting the text of link and the href of the link
    //     link.textContent = data[i].html_url;
    //     link.href = data[i].html_url;

    //     // Appending the link to the tabledata and then appending the tabledata to the tablerow
    //     // The tablerow then gets appended to the tablebody
    //     tableData.appendChild(link);
    //     createTableRow.appendChild(tableData);
    //     tableBody.appendChild(createTableRow);
    
    });
}

fetchButton.addEventListener('click', getApi);
