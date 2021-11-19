var actualCityHeader = document.querySelector("#city");
var actualTemperature = document.querySelector("#actualTemperature")
var uvValue = document.querySelector("#uvValue");
var windSpeed = document.querySelector("#windSpeed");
var windDirection = document.querySelector("#windDirection")
var sunRiseTime = document.querySelector("#sunRiseTime");
var sunSetTime = document.querySelector("#sunSetTime");

function actualWeather(){
    fetch("https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=19&lat=47.5", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
		"x-rapidapi-key": "2dfa2f19c3mshef9b7bf2be454b1p160f2cjsnfbbbd48476e0"
	}
})
.then(response => {
	console.log(response);
    return response.json();
})
.then(function(actualData){
    var appData = actualData.data[0];
    console.log(actualData);
    console.log(actualData.count)
    console.log(actualData.data[0].city_name)
    actualCityHeader.innerHTML = actualData.data[0].city_name;
    actualTemperature.innerHTML = actualData.data[0].temp + " Celsius";
    uvValue.innerHTML = actualData.data[0].uv;
    windSpeed.innerHTML = actualData.data[0].wind_spd;
    windDirection.innerHTML = actualData.data[0].wind_cdir_full;
    sunRiseTime.innerHTML = actualData.data[0].sunrise;
    sunSetTime.innerHTML = actualData.data[0].sunset;

})
.catch(err => {
	console.error(err);
});
}
let daysOfWeek = {
    "Monday": [], 
    "Tuesday" : [],
    "Wednesday": [],
    "Thursday": [],
    "Friday": [],
    "Saturday": [],
    "Sunday": []
};

/* actualWeather(); */

function fiveDaysForecast(){
    fetch("https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=47.5&lon=19", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
            "x-rapidapi-key": "2dfa2f19c3mshef9b7bf2be454b1p160f2cjsnfbbbd48476e0"
        }
    })
    .then(response => {
        console.log(response);
        array.forEach(days => {
            
        });
    })
    .catch(err => {
        console.error(err);
    });
}





var menuBtn = document.getElementsById("menuButton");
menuBtn.addEventListener("click", openSetting);

function openSetting(m){
    var settingDiv = document.querySelector("settings");
    console.log("lefut");
    let menu;

    if (m.target.classList.contains("menuButton")) {
        menu = m.target.parentElement
    }
    else{
        menu = m.target.parentElement.parentElement;
    }
    menu.classList.toggle("question")

    /* settingDiv.toggle(); */
}
//Nem adja át az értékeket.
/* function hourly (){

}
function actualDayInfo(actual){
    var uvValue = document.querySelector("#uvValue");
    uvValue.innerHTML = actual.data[0].uv;
}*/

/* function menuClick() 
 */    


