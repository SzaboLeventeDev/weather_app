var actualCityHeader = document.querySelector("#city");
var actualTemperature = document.querySelector("#actualTemperature")
var uvValue = document.querySelector("#uvValue");
var windSpeed = document.querySelector("#windSpeed");
var windDirection = document.querySelector("#windDirection")
var sunRiseTime = document.querySelector("#sunRiseTime");
var sunSetTime = document.querySelector("#sunSetTime");
var firstObjectOfNextDayIndex;

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
var day = {
    date: "",
    min: "",
    max: ""
}
var fiveDay = [];

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
        return response.json();
        
    })
    .then(function(fiveDaysForecast){
        var forecastData = fiveDaysForecast.data;
        console.log(fiveDaysForecast)
        console.log(forecastData[0].temp)
        dataTimeCutting(fiveDaysForecast);
        var data = firstObjectOfNextDayIndex;
        var dailyMinTemp = "";
        var dailyMaxTemp = "";

        for (var index = 0; index < 4; index++) {
            for (let i = data; i < data+8; i++){
                day.date = forecastData[i].timestamp_local;
               
                console.log("előző min érték az " + index + ". napon: " + dailyMinTemp)
                console.log("előző max érték az " + index + ". napon: " + dailyMaxTemp)
                if (dailyMinTemp < forecastData[i].temp | dailyMaxTemp < forecastData[i].temp) {
                        dailyMaxTemp = forecastData[i].temp
                        console.log("dailyMaxTemp: ", dailyMaxTemp, "   tömb aktuális min értéke: ", dailyMinTemp)
                }
                if(dailyMinTemp > forecastData[i].temp | dailyMaxTemp > forecastData[i].temp) {
                        dailyMinTemp = forecastData[i].temp
                        console.log("dailyMinTemp: ", dailyMinTemp, "   tömb aktuális min értéke: ", forecastData[i].temp)
                        
                }    
            }
                day.min == dailyMinTemp;
                day.max = dailyMaxTemp;
                console.log(index + "idő: " + day.date)
                console.log(index + ". nap min: " + day.min); 
                console.log(index + ". nap max: "+day.max);
                fiveDay.push(day)

                data = data + 8;
        }
             
    })
    .catch(err => {
        console.error(err);
    });
}
function dataTimeCutting(fiveDayData){
    
    for (var i = 0; i < 7; i++) {
        var actualTime = fiveDayData.data[i].timestamp_local.substr(11);
        console.log(i + ". elem értéke: "+ actualTime);
        if (actualTime == "00:00:00" | actualTime == "01:00:00" | actualTime == "02:00:00") {
            firstObjectOfNextDayIndex = i;
            console.log("5 napos előrejelzés első eleme: " + firstObjectOfNextDayIndex + "az " + i + ". körben");
            break
        }
        
    }
}

fiveDaysForecast();

var menuBtn = document.getElementById("menuButton");
menuBtn.addEventListener("click", openSetting);
function openSetting(){
    console.log("katt");
   var settingDiv = document.getElementById("settingsContainer");
    /* var mainBlur = document.getElementsByTagName(main); */
    settingDiv.classList.toggle("editSettings");
    /* mainBlur.classList.toggle("blur") */
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


