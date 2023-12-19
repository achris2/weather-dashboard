// selectors of the history div, forecast div & main div
let todayDiv = $('#today-div'); 
let historyDiv = $('#history');
let forecastCards = $('#forecast-cards'); 


// // initialise local storage variable

let cityHistory = [];

// 

$(document).ready(function () {
    // Load city history from local storage
    cityHistory = JSON.parse(localStorage.getItem('cityHistory')) || [];

    // Display the city history on the webpage
    displayCityHistory();

    // add event listener to clear history button
    $('#clear-history-button').on('click', function () {
        clearSearchHistory();
    });
});

// clear search history function 

function clearSearchHistory() {
    // clear the search history in local storage
    localStorage.removeItem('cityHistory');

    // clear the search history in the UI
    cityHistory = [];
    historyDiv.empty();
}

// add event listener to search button 

$('#search-button').on('click', function (event) {
    event.preventDefault();
    let chosenCity = $('#search-input').val();
    searchWeather(chosenCity);
});

// add event listener to history buttons 

$('#history').on('click', 'button', function () {
    let chosenCity = $(this).text();
    searchWeather(chosenCity);
    console.log("click is working");
    console.log($(this).text());
});


function displayCityHistory(){
     cityHistory = JSON.parse(localStorage.getItem('cityHistory')) || [];
     // emtpy History Div 
     historyDiv.empty();
     // Display Search History from Local Storage
     for (let i=0; i < cityHistory.length; i++){
         historyDiv.append(`<button type="button" class="btn btn-secondary btn-sm" id="${cityHistory[i]}-button"> ${cityHistory[i]} </button>`) 
     }
}


// search function 
function searchWeather(chosenCity){
      // Store chosen city in the search history
    cityHistory.push(chosenCity);
    localStorage.setItem('cityHistory', JSON.stringify(cityHistory));
  
    // call display city history function 

    displayCityHistory();

    let queryURL ="https://api.openweathermap.org/data/2.5/forecast?q=" + chosenCity + "&units=&appid=fa4695e0608a76d517ec72dbb80b9028";

    // documentation https://openweathermap.org/forecast5 

    fetch(queryURL)
    .then(function(response){
        return response.json();
    }) .then (function(data){
//         Call the API and render the result in the HTML 
// //          Date, Temperature, Win 
// //          - temperature
// //          - wind speed
// //          - humidity
// //          - icon
        console.log(data);

        // empties main card & forecast cards 

        todayDiv.empty();
        forecastCards.empty();

        // Date 
        // get timestamp in Unix, which is no of seconds since 1970
        // Need to convert convert unix Time Stamp to Date 
        let currentTime = new Date(data.list[0].dt * 1000);

        // format Date 
        let formattedDate = ('0' + currentTime.getDate()).slice(-2) + ' /' + ('0' + (currentTime.getMonth() + 1)).slice(-2) + ' /' + currentTime.getFullYear();
        
        //  Temperature 
        let tempCelsius = Math.round(data.list[0].main.temp-273.15); Math.round()

        // Wind Speed 

        let windSpeed = data.list[0].wind.speed;
        console.log(windSpeed);

        // Humidity 

        let humidity = data.list[0].main.humidity;
        console.log(humidity);

        // Icon -         //Icon URL
        // https://openweathermap.org/img/w/' + weather[0].icon + '.png
        let icon = data.list[0].weather[0].icon;
        let iconURL = 'https://openweathermap.org/img/w/' + icon + '.png'; 
        console.log(icon);
        console.log(iconURL);

        // appends the info on chosen city to main card 
        todayDiv.append(`<h2>${chosenCity} (${formattedDate}) <img src="${iconURL}"> </h2>`);
        todayDiv.append(`<p>Temp: ${tempCelsius} °C</p>`);
        todayDiv.append(`<p>Wind Speed: ${windSpeed} KPH</p>`);
        todayDiv.append(`<p>Humidity: ${humidity}%</p>`);


        // loops through the API result and generates the cards 

        for (let i=0; i< data.list.length; i++){
            let currentTime = new Date(data.list[i].dt * 1000);
            let formattedDate = ('0' + currentTime.getDate()).slice(-2) + '/' + ('0' + (currentTime.getMonth() + 1)).slice(-2) + '/' + currentTime.getFullYear();
            let tempCelsius = Math.round(data.list[i].main.temp-273.15); Math.round();
            let windSpeed = data.list[i].wind.speed;
            let humidity = data.list[i].main.humidity;
            let icon = data.list[i].weather[0].icon;
            let iconURL = 'https://openweathermap.org/img/w/' + icon + '.png';
            let forecastCards = $('#forecast-cards'); 

            forecastCards.append(`
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title"> ${formattedDate} </h5>
                        <p class="card-text">
                            <p><img src="${iconURL}"></p>
                            <p>Temp: ${tempCelsius} °C</p>
                            <p>Wind Speed: ${windSpeed} KPH</p>
                            <p>Humidity: ${humidity}%</p>
                        </p>
                    </div>
                </div>
            </div>
        `);
        }

    })
}
