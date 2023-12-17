// add event listener to form submit 

$('#search-button').on('click', function(event){
    event.preventDefault();
    let chosenCity = $('#search-input').val();
    console.log (chosenCity);

    let queryURL ="https://api.openweathermap.org/data/2.5/forecast?q=" + chosenCity + "&units=&appid=fa4695e0608a76d517ec72dbb80b9028&units=metric";
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

        // Date 
        let currentTime = data.list[0].dt_txt;
        console.log(currentTime);
        // get timestamp in Unix, which is no of seconds since 1970
        // Need to convert convert unix Time Stamp to Date 

        let todayDiv = $('#today'); 
        todayDiv.text(currentTime);
        //  Temperature 
        let temperature = data.list[0].main.temp;
        todayDiv.append(temperature);


        // Wind Speed 

        let windSpeed = data.list[0].wind.speed;
        console.log(windSpeed);

        // Humidity 

        let humidity = data.list[0].main.humidity;
        console.log(humidity);

        // Icon 
        let icon = data.list[0].weather.icon;
        console.log(icon);
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