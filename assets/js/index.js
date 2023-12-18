// Load search history from localStorage on page load
$(document).ready(function () {
    loadSearchHistory();
});

// add event listener to form submit 

$('#search-button').on('click', function(event){
    event.preventDefault();
    let chosenCity = $('#search-input').val();
    let queryURL ="https://api.openweathermap.org/data/2.5/forecast?q=" + chosenCity + "&units=&appid=fa4695e0608a76d517ec72dbb80b9028";
    console.log(queryURL);

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

        // selectors of the history div, forecast div & main div
        let todayDiv = $('#today-div'); 
        let historyDiv = $('#history');
        let forecastCards = $('#forecast-cards'); 

        // empties main card & forecast cards 

        todayDiv.empty();
        forecastCards.empty();

        // add to City to Search History Button

        historyDiv.append(`<button type="button" class="btn btn-secondary"> ${chosenCity} </button>`) 

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

})






// get the user input value 

// Build the API query based on the user input value 
// Call the API and render the result in the HTML 
//          - date 
//          - temperature
//          - wind speed
//          - humidity
//          - icon 
//  - render those values to the main card 
//  - loop through all weathers array and get the following value s
//      - date
//      - temperature 
//      - wind speed
//      - humidity 
//      - icon 
// - render those values to the smaller card