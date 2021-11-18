var actualCityHeader = document.querySelector("#city");
var actualTemperature = document.querySelector("#actualTemperature")
var uvValue = document.querySelector("#uvValue");
var windSpeed = document.querySelector("#windSpeed");
var windDirection = document.querySelector("#windDirection")
var sunRiseTime = document.querySelector("#sunRiseTime");
var sunSetTime = document.querySelector("#sunSetTime");

function weatherOfBudapest(){
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
//Nem adja át az értékeket.
/* function hourly (){

}
function actualDayInfo(actual){
    var uvValue = document.querySelector("#uvValue");
    uvValue.innerHTML = actual.data[0].uv;
}*/


/* weatherOfBudapest(); */