const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dataOutput = document.querySelector(".data");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const iconOutput = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

let cityInput = "London";

console.log("hi");

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
})

form.addEventListener('submit', (e) => {
    if(search.value.length == 0) {
        alert("Please type a city name");
    }else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }

    e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return weekday[new Date(`$(day)/$(month)/$(year)`).getDay()];
};

function fetchWeatherData(){
    const KEY = b40341c664da4a52bda195646220411
    fetch(`http://api.weatherapi.com/v1/current.json?key=b40341c664da4a52bda195646220411&q=${cityInput}&aqi=no`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            temp.innerHTML = data.current.temp_c + "&#176";
            conditionOutput.innerHTML = data.current.condition.text;
            const date = data.location.localtime;
            const y = parseInt(date.substr(0,4));
            const m = parseInt(date.substr(5,2));
            const d = parseInt(date.substr(8,2));
            const time = date.substr(11);

            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d} ${m} ${y}`;
            timeOutput.innerHTML = time;
            nameOutput.innerHTML = data.location.name;
            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "km/h";

            let timeOfDay = "day";
            const code = data.current.condition.code;

            if(!data.current.is_day) {
                timeOfDay = "night";
            }

            if(code == 1000) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg`;
                btn.stylebackground = "#e5ba92";
                if(timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            }
            else if (
                code == 1003 ||
                code == 1006 ||
                code == 1009
            ){
                app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy)`;
                btn.style.background = "#fa6d1b"
                if(timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            }
            app.style.opacity = "1";
        })
        .catch(() => {
            alert("Try Again");
            app.style.opacity = "1";
        });
}

fetchWeatherData();
app.style.opacity = "1";