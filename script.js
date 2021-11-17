/* const data = null;
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function(){
    if (this.readyState === this.DONE) {
        console.log(this.responseText);
    }
});

xhr.open("GET", "https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=38.5&lat=-78.5");
xhr.setRequestHeader("x-rapidapi-host", "weatherbit-v1-mashape.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "2dfa2f19c3mshef9b7bf2be454b1p160f2cjsnfbbbd48476e0");

xhr.send(data); */
var actualCityHeader = document.querySelector("#city");
function weatherOfBudapest(){
    const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
        var city = JSON.parse(xhr.responseText).city_name;
        console.log(city);
	}
    actualCityHeader.textContent = city;
});

actualCityHeader.textContent = city;


xhr.open("GET", "https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=19&lat=47.5");
xhr.setRequestHeader("x-rapidapi-host", "weatherbit-v1-mashape.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "2dfa2f19c3mshef9b7bf2be454b1p160f2cjsnfbbbd48476e0");

xhr.send(data);
}

weatherOfBudapest();