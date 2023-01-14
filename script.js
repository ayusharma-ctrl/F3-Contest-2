var fetchDataBtn = document.getElementById("fetchDataBtn")
var upperDiv = document.getElementById("upperDiv")
var lowerDiv = document.getElementById("lowerDiv")
var insideUpperDiv = document.getElementById("insideUpperDiv")
var spanLat = document.getElementById("spanLat")
var spanLong = document.getElementById("spanLong")
var map = document.getElementsByTagName("iframe")[0]
var w1 = document.getElementById("w1")
var w2 = document.getElementById("w2")
var w3 = document.getElementById("w3")
var w4 = document.getElementById("w4")
var w5 = document.getElementById("w5")
var w6 = document.getElementById("w6")
var w7 = document.getElementById("w7")
var w8 = document.getElementById("w8")
var w9 = document.getElementById("w9")
var w10 = document.getElementById("w10")

var urlLocation = "https://api.ipgeolocation.io/ipgeo?apiKey=7bf6f321bb3643b797fb0e912fab013b"
var urlWeatherApi;

//storing location data so that we can use it later
var locationDataFinal;

//this is to send fetch request on page load, this will save our time
// Note: we can send this request on clicking of button, but it will take some more time
async function getLocation() {
    try {
        const location = await fetch(urlLocation)
        const locationData = await location.json()
        locationDataFinal = locationData
    }
    catch (error) {
        console.log("Unable to fetch location" + error);
    }
}

document.addEventListener('DOMContentLoaded', getLocation)

function getWeatherReport() {
    var weatherDataFetch = fetch(urlWeatherApi)
    weatherDataFetch.then(data=>data.json())
    .then(data=> {
        w1.textContent = data.name
        w2.textContent = data.coord.lat
        w3.textContent = data.timezone
        w4.textContent = data.wind.speed
        w5.textContent = data.main.pressure
        w6.textContent = data.main.humidity
        w7.textContent = data.wind.deg
        w8.textContent = "This data is not available"
        w9.textContent = data.main.feels_like
        w10.textContent = data.coord.lon
    })
    .catch(error=>console.error("Can't fetch weather data " + error))    
}

function startFetching() {
    upperDiv.style.height = "110vh"
    fetchDataBtn.style.display = 'none'
    insideUpperDiv.style.display = 'contents'
    lowerDiv.style.display = 'contents'
    spanLat.textContent = locationDataFinal.latitude
    spanLong.textContent = locationDataFinal.longitude
    map.src = `https://maps.google.com/maps?q=${locationDataFinal.latitude},${locationDataFinal.longitude}&z=15&output=embed`
    urlWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${locationDataFinal.latitude}&lon=${locationDataFinal.longitude}&units=metric&appid=fd17614b5d9290b88149714e7a7013af`
    getWeatherReport()
}

fetchDataBtn.addEventListener('click', startFetching)