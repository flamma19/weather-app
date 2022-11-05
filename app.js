//api key: fc38d11bdd7a5956e133fb2adb0360d1;
//select elements

const iconElement = document.querySelector('.weather.icon')
const tempElement = document.querySelector('.temperature-value p')
const descElement = document.querySelector('.temperature-description p')
const locationElement = document.querySelector('.location p')
const notificationElement = document.querySelector('.notification')

//app data

const weather = {};
weather.temperature = {
    unit: 'Celsius'
};

//const and variables
const KELVIN = 273;

//api key
const key = "fc38d11bdd7a5956e133fb2adb0360d1";

//check browser geolocation
if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = "<p> Browser Doesn't support Geolocation </p>";
}

//set position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//Show Error when there is a problem with geolocation

function showError(error){
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

//get weather from API

function getWeather(latitude,longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    fetch(api)
        .then(function (response){
           let data = response.json();
           return data;
        })
        .then(function (data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            console.log(data);
        })
        .then(function(){
          displayWeather();
        });
}

//display weather to UI

function displayWeather(){
    //iconElement.innerHTML = `<img src='icons/${weather.iconId}.png/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}