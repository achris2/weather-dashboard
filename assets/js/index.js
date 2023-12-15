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
        console.log(data);
        console.log(data.list[0].dt);
        
        // timestamp in Unix 
        let unixTime = data.list[0].dt);
        // convert unix Time Stamp to Date 

        
        //  let temperature = data.response.docs[0]. 
        //  let windSpeed = data.response.docs[0]. 
        //  let humidity = data.response.docs[0]. 
        //  let icon = data.response.docs[0]. ; 
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
//  - render those values to the smaller card 
