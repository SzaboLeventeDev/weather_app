var actualCityHeader = document.querySelector("#city");
var actualTemperature = document.querySelector("#actualTemperature")
var uvValue = document.querySelector("#uvValue");
var windSpeed = document.querySelector("#windSpeed");
var windDirection = document.querySelector("#windDirection")
var sunRiseTime = document.querySelector("#sunRiseTime");
var sunSetTime = document.querySelector("#sunSetTime");
var firstObjectOfNextDayIndex;
/* -------------------------------------Actual weather ----------------------------------------------------- */
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
    document.getElementById("currentWeatherIcon").src = "icons/" + appData.weather.icon + ".png";
    document.getElementById("currentWeatherIcon").alt = appData.weather.description;

})
.catch(err => {
	console.error(err);
});
}

/* ------------------------------------------Five days forecast ----------------------------------------------- */
var day = {
    date: "",
    min: "",
    max: "",
    icon: "",
    description: ""
}
var fiveDay = [];



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
            
            console.log(index + "id??: " + day.date)
            var dailyMinTemp = "";
            var dailyMaxTemp = "";
            //Loop for iterate daily data to day{}
            for (let i = data; i < data+8; i++){
                day.date = forecastData[i].timestamp_local.substr(0,10);
               console.log("k??vetkez?? nap els?? elem??nek indexe: " + data)
               day.icon = forecastData[i].weather.icon;
               day.description = forecastData[i].weather.description;
                console.log("el??z?? min ??rt??k az " + index + ". napon: " + dailyMinTemp)
                console.log("el??z?? max ??rt??k az " + index + ". napon: " + dailyMaxTemp)
                if (dailyMinTemp < forecastData[i].temp | dailyMaxTemp < forecastData[i].temp) {
                        dailyMaxTemp = forecastData[i].temp
                        console.log("dailyMaxTemp: ", dailyMaxTemp, "   t??mb aktu??lis min ??rt??ke: ", dailyMinTemp)
                }else{console.log("Nem t??rt??nt v??ltoz??s a max ??rt??kben")}
                if(dailyMinTemp > forecastData[i].temp | dailyMinTemp == "" | dailyMaxTemp > forecastData[i].temp) {
                        dailyMinTemp = forecastData[i].temp
                        console.log("dailyMinTemp: ", dailyMinTemp, "   t??mb aktu??lis max ??rt??ke: ", dailyMaxTemp)
                        
                }else{console.log("Nem t??rt??nt v??ltoz??s a min ??rt??kben")}  
            }
            day.min = dailyMinTemp;
            day.max = dailyMaxTemp;
            console.log(index + ". nap min: " + day.min); 
            console.log(index + ". nap max: "+day.max);
            console.log(day);
            fiveDay.push(day);
            console.log(fiveDay);
            data = data + 8; 
            console.log("??jabb nap els?? elem??nek indexe: " + data);   
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
        console.log(i + ". elem ??rt??ke: "+ actualTime);
        if (actualTime == "00:00:00" | actualTime == "01:00:00" | actualTime == "02:00:00") {
            firstObjectOfNextDayIndex = i;
            console.log("5 napos el??rejelz??s els?? eleme: " + firstObjectOfNextDayIndex + "az " + i + ". k??rben");
            break
        }
        
    }
}

function fiveDayTilesData(){
//Adatok bet??lt??se ID-k haszn??lat??val.
    //first day
    document.getElementById("firstDayMaxValue").innerText = fiveDay[0].max;
    document.getElementById("firstDayMinValue").innerText = fiveDay[0].min;
    document.getElementById("firstDay").innerText = fiveDay[0].date;
    document.getElementById("firstDayIcon").src = "icons/" + fiveDay[0].icon +".png";
    document.getElementById("firstDayIcon").alt = fiveDay[0].description;

    //second day
    document.getElementById("secondDayMaxValue").innerText = fiveDay[1].max;
    document.getElementById("secondDayMinValue").innerText = fiveDay[1].min;
    document.getElementById("secondDay").innerText = fiveDay[1].date;
    document.getElementById("secondDayIcon").innerHTML = fiveDay[1].icon;
    document.getElementById("secondDayIcon").src = "icons/" + fiveDay[0].icon +".png";
    document.getElementById("secondDayIcon").alt = fiveDay[0].description;

    //third day
    document.getElementById("thirdDayMaxValue").innerText = fiveDay[2].max;
    document.getElementById("thirdDayMinValue").innerText = fiveDay[2].min;
    document.getElementById("thirdDay").innerText = fiveDay[2].date;
    document.getElementById("thirdDayIcon").src = "icons/" + fiveDay[0].icon +".png";
    document.getElementById("thirdDayIcon").alt = fiveDay[0].description;

    //fourth day
    document.getElementById("fourthDayMaxValue").innerText = fiveDay[3].max;
    document.getElementById("fourthDayMinValue").innerText = fiveDay[3].min;
    document.getElementById("fourthDay").innerText = fiveDay[3].date;
    document.getElementById("fourthDayIcon").src = "icons/" + fiveDay[0].icon +".png";
    document.getElementById("fourthDayIcon").alt = fiveDay[0].description;
    //fifth day
    document.getElementById("fifthDayMaxValue").innerText = fiveDay[4].max;
    document.getElementById("fifthDayMinValue").innerText = fiveDay[4].min;
    document.getElementById("fifthDay").innerText = fiveDay[4].date;
    document.getElementById("fifthDayIcon").src = "icons/" + fiveDay[0].icon +".png";
    document.getElementById("fifthDayIcon").alt = fiveDay[0].description;
}



/* ---------------------------------One hour forecast ------------------------------------------- */

var temperatureData = {
    temperature: "",
    time: "",
    icon: "",
    description: ""
};

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
            //JSON object not included icon and description. Need to find another solution for it.
            /* document.getElementById(index + "minLaterIcon").src = "icons/" + data[index].weather.icon + ".png";
            document.getElementById(index + "minLaterIcon").alt = data[index].weather.description; */
        }
        oneHourTemperatures.push(temperatureData);
    }
    console.log(temperatureData);
}

/* ---------------------------------Menu button ------------------------------------------------ */
var menuBtn = document.getElementById("menuButton");
menuBtn.addEventListener("click", openSetting);
function openSetting(){
    console.log("katt");
   var settingDiv = document.getElementById("settingsContainer");
    /* var mainBlur = document.getElementsByTagName(main); */
    settingDiv.classList.toggle("editSettings");
    /* mainBlur.classList.toggle("blur") */
}
//Nem adja ??t az ??rt??keket.
/* function hourly (){

}
function actualDayInfo(actual){
    var uvValue = document.querySelector("#uvValue");
    uvValue.innerHTML = actual.data[0].uv;
}*/

/* function menuClick() 
 */    

/* ----------------------------Invite functions-------------------------------------------------- */

/* oneHourForecast(); */
/* fiveDaysForecast(); */
/* actualWeather(); */



oneHourForecast();
 fiveDaysForecast();
actualWeather();