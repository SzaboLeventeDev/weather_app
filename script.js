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

//-----------------------------------------Five days forecast-----------------------------------------------------------

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
        

        //loop for pushing forecast data to fiveDay[]
        for (var index = 0; index < 4; index++) {
            
            console.log(index + "idő: " + day.date)
            var dailyMinTemp = "";
            var dailyMaxTemp = "";
            //Loop for iterate daily data to day{}
            for (let i = data; i < data+8; i++){
                day.date = forecastData[i].timestamp_local.substr(0,10);
               console.log("következő nap első elemének indexe: " + data)
                console.log("előző min érték az " + index + ". napon: " + dailyMinTemp)
                console.log("előző max érték az " + index + ". napon: " + dailyMaxTemp)
                if (dailyMinTemp < forecastData[i].temp | dailyMaxTemp < forecastData[i].temp) {
                        dailyMaxTemp = forecastData[i].temp
                        console.log("dailyMaxTemp: ", dailyMaxTemp, "   tömb aktuális min értéke: ", dailyMinTemp)
                }else{console.log("Nem történt változás a max értékben")}
                if(dailyMinTemp > forecastData[i].temp | dailyMinTemp == "" | dailyMaxTemp > forecastData[i].temp) {
                        dailyMinTemp = forecastData[i].temp
                        console.log("dailyMinTemp: ", dailyMinTemp, "   tömb aktuális max értéke: ", dailyMaxTemp)
                        
                }else{console.log("Nem történt változás a min értékben")}  
            }
            day.min = dailyMinTemp;
            day.max = dailyMaxTemp;
            console.log(index + ". nap min: " + day.min); 
            console.log(index + ". nap max: "+day.max);
            console.log(day);
            fiveDay.push(day);
            console.log(fiveDay);
            data = data + 8; 
            console.log("újabb nap első elemének indexe: " + data);   
        }
        fiveDayTilesData();    
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

function fiveDayTilesData(){
//Adatok betöltése ID-k használatával.
    //first day
    document.getElementById("firstDayMaxValue").innerText = fiveDay[0].max;
    document.getElementById("firstDayMinValue").innerText = fiveDay[0].min;
    document.getElementById("firstDay").innerText = fiveDay[0].date;

    //second day
    document.getElementById("secondDayMaxValue").innerText = fiveDay[1].max;
    document.getElementById("secondDayMinValue").innerText = fiveDay[1].min;
    document.getElementById("secondDay").innerText = fiveDay[1].date;

    //third day
    document.getElementById("thirdDayMaxValue").innerText = fiveDay[2].max;
    document.getElementById("thirdDayMinValue").innerText = fiveDay[2].min;
    document.getElementById("thirdDay").innerText = fiveDay[2].date;

    //fourth day
    document.getElementById("fourthDayMaxValue").innerText = fiveDay[3].max;
    document.getElementById("fourthDayMinValue").innerText = fiveDay[3].min;
    document.getElementById("fourthDay").innerText = fiveDay[3].date;
    //fifth day
    document.getElementById("fifthDayMaxValue").innerText = fiveDay[4].max;
    document.getElementById("fifthDayMinValue").innerText = fiveDay[4].min;
    document.getElementById("fifthDay").innerText = fiveDay[4].date;
}

//-----------------------------------------One hour forecast-----------------------------------------------------------
var temperatureData = {
    temperature: "",
    time: "",
    icon:"",
    description:""
}

var oneHourTemperatures = [];

function oneHourForecast(){
    fetch("https://weatherbit-v1-mashape.p.rapidapi.com/forecast/minutely?lat=35.5&lon=-78.5", {
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
    .then(hourlyData => {
        var hourlyForecastData = hourlyData.data;
        console.log(hourlyData);
        fiveMinutes(hourlyForecastData);
    })
    .catch(err => {
	    console.error(err);
    });
}

function fiveMinutes(data){
    var laterTemperature = document.getElementById("5minLaterTemperature");
    for (var index = 0; index < 59; index++) {
        if (index % 5 == 0 && index != 0) {
            console.log(index + "minLaterTime");
            document.getElementById(index + "minLaterTemperature").innerText = data[index].temp;
            document.getElementById(index + "minLaterTime").innerText = data[index].timestamp_local.substr(11,14);
            /* document.getElementById(index + "minLaterIcon").src = "icons/" + data[index].weather.icon + ".png";
            document.getElementById(index + "minLaterIcon").alt = data[index].weather.description; */
        }
        oneHourTemperatures.push(temperatureData);
    }
    console.log(temperatureData);
}

function oneHourTilesData(){

}
/* actualWeather(); */
/* fiveDaysForecast(); */
/* oneHourForecast(); */

//-----------------------------------------Menu for settings-----------------------------------------------------------

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
