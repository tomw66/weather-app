import './style.css';

class Profile {
    constructor(location, forecast, temperature, feelsLike, humidity, wind) {
    this.location = location;
    this.forecast = forecast;
    this.temperature = Math.round(temperature);
    this.feelsLike = Math.round(feelsLike);
    this.humidity = humidity;
    this.wind = wind;
}}

async function getData(location, units) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=c176b6076859914afc05d81f79ba3b12`, {mode: 'cors'});
    const data = await response.json();
    return data;
};

function createProfile(data) {
    let cityProfile = new Profile(data.name, data.weather[0].main, data.main.temp, data.main.feels_like, data.main.humidity, data.wind.speed);
    return cityProfile;
}

function displayProfile(weather, units) {
    let container = document.querySelector('#container');
    let card = document.createElement('div');
    card.classList.add("card");
    container.appendChild(card);
    let elements = ['location', 'forecast', 'temperature', 'feelsLike', 'humidity', 'wind']
    elements.forEach(function(item) {
        let a = 
        item === 'location' ? 'h1' 
        : item === 'forecast' ? 'h2' 
        : 'p';
        let p = document.createElement(a)
        p.id = item + 'Display';
        card.appendChild(p)
    })
    let tempUnit;
    let windUnit;
    if(units === 'metric') {
        tempUnit = ' °C';
        windUnit = ' metres/second';
    }
    else {
        tempUnit = ' °F';
        windUnit = ' miles/hour';
    };
    document.querySelector('#locationDisplay').innerText = weather.location;
    document.querySelector('#forecastDisplay').innerText = weather.forecast;
    document.querySelector('#temperatureDisplay').innerText = weather.temperature + tempUnit;
    document.querySelector('#feelsLikeDisplay').innerText = 'Feels like: ' + weather.feelsLike + tempUnit;
    document.querySelector('#humidityDisplay').innerText = 'Humidity: ' + weather.humidity +'%';
    document.querySelector('#windDisplay').innerText = 'Wind: ' + weather.wind + windUnit;

}

function formProcessing() {
    const city = document.querySelector('#city');
    const unitList = document.querySelectorAll('.radio');
    let unit;
    for (let i = 0; i < unitList.length; i++) {
        if(unitList[i].checked) {
            unit = unitList[i];
        }
    }
    let location = city.value;
    let unitChoice = unit.value;
    return {location, unitChoice}
}

async function formSubmission(event) {
    event.preventDefault();
    const errorLog = document.querySelector('#errorMessage');
    let params = formProcessing();
    try {
        errorLog.innerText = '';
        let rawData = await getData(params.location, params.unitChoice);
        let processedData = createProfile(rawData);
        displayProfile(processedData, params.unitChoice);
    }
    catch(err) {
        console.log(err)
        errorLog.innerText = 'City not found! Try again.'
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', formSubmission);