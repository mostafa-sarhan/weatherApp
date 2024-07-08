// Selected Search input
let search_input = document.querySelector("#search");

// Selected Item today

let todayName = document.querySelector(".day");
let todayDate = document.querySelector(".date");
let todayLocation = document.querySelector(".location");
let temp_today = document.querySelector(".num");
let todayConditionImg= document.querySelector(".today_icon");
let condition_text= document.querySelector(".condition-text");
let humidity = document.querySelector(".humidity ");
let wind = document.querySelector(".wind");
let wind_direction = document.querySelector(".wind_direction");

// Selected item tomorrow
let next_day_name = document.querySelector(".next_day_name");
let next_day_img = document.querySelector(".next_day_img");
let next_day_max_temp = document.querySelector(".next_day_max_temp");
let next_day_min_temp = document.querySelector(".next_day_min_temp");
let next_day_cond_text = document.querySelector(".next_day_cond_text");


// Selected item After Tomorrow
let day_after_tomorrow_name = document.querySelector(".day_after_tomorrow_name");
let day_after_tomorrow_img = document.querySelector(".day_after_tomorrow_img");
let day_after_tomorrow_max_temp = document.querySelector(".day_after_tomorrow_max_temp");
let day_after_tomorrow_min_temp = document.querySelector(".day_after_tomorrow_min_temp");
let day_after_tomorrow_cond_text = document.querySelector(".day_after_tomorrow_cond_text");


// Fetch Api

async function getWeatherData(cityName) {
    try{
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=92fb353929d24f14a52142209240607&q=${cityName}&days=3`);
        let dataResponse = await response.json();
        // console.log(dataResponse);
        return dataResponse ;
    }
    catch (err){
        console.log(err);
    }
}

// Date built in object in javascript
// console.log(date);
// console.log(date.getDate());
// console.log(date.toLocaleDateString("en-us",{weekday: "long"}));
// console.log(date.toLocaleDateString("en-us",{month: "long"}));

// Display today Data
function displayTodayData(data){
    try{
        let date = new Date();
        todayName.innerHTML = date.toLocaleDateString("en-us",{weekday: "long"});
        todayDate.innerHTML = date.getDate() + " " +date.toLocaleDateString("en-us",{month: "long"}) ;
        todayLocation.innerHTML = data.location.name;
        temp_today.innerHTML = data.current.temp_c;
        todayConditionImg.setAttribute("src","data.current.condition.icon");
        condition_text.innerHTML = data.current.condition.text;
        humidity.innerHTML =data.current.humidity +"%";
        wind.innerHTML =data.current.wind_kph + "km/h" ;
        wind_direction.innerHTML =data.current.wind_dir;
    }
    catch (err){
        console.log(err);
    }

}

// Display tomorrow Data
function displayNextDay(data){
    try{
        let forecastData = data.forecast.forecastday;
        for(let i =0 ; i < 2 ; i++){
    
            // Next Day
            let nextDate = new Date(forecastData[i].date);
            next_day_name.innerHTML = nextDate.toLocaleDateString("en-us",{weekday: "long"})
            next_day_max_temp.innerHTML = forecastData[i].day.maxtemp_c;
            next_day_min_temp.innerHTML = forecastData[i].day.mintemp_c;
            next_day_cond_text.innerHTML = forecastData[i].day.condition.text;
            next_day_img.setAttribute("src",forecastData[i].day.condition.icon);
    
    
            // After Tomorrow Day
            let afterTomorrowDay = new Date(forecastData[i+1].date)
            day_after_tomorrow_name.innerHTML = afterTomorrowDay.toLocaleDateString("en-us",{weekday: "long"})
            day_after_tomorrow_max_temp.innerHTML = forecastData[i+1].day.maxtemp_c;
            day_after_tomorrow_min_temp.innerHTML = forecastData[i+1].day.mintemp_c;
            day_after_tomorrow_cond_text.innerHTML = forecastData[i+1].day.condition.text;
            day_after_tomorrow_img.setAttribute("src",forecastData[i+1].day.condition.icon);
        }
    }
    catch (err){
        console.log(err);
    }
    
}




// Function Start App 

async function startApp(city="alex"){
    let getWeatherData_2 = await getWeatherData(city);
    if(!getWeatherData_2.error ){
        displayTodayData(getWeatherData_2);
        displayNextDay(getWeatherData_2);
    }
} 
startApp();


search_input.addEventListener("keyup",function(){
    // console.log(search_input.value);
    startApp(search_input.value);
})