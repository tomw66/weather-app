class Profile {
    constructor(location, forecast, temperature, feelsLike, humidity, wind) {
    this.location = location;
    this.forecast = forecast;
    this.temperature = temperature;
    this.feelsLike = feelsLike;
    this.humidity = humidity;
    this.wind = wind;
}}

async function getData(location, units) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=c176b6076859914afc05d81f79ba3b12`, {mode: 'cors'});
    const data = await response.json(); //handle errors somewhere, try/catch?
    return data;
};

function createProfile(data) {
    let cityProfile = new Profile(data.name, data.weather[0].main, data.main.temp, data.main.feels_like, data.main.humidity, data.wind.speed);
    return cityProfile;
}

function displayProfile(weather) {
    //can we loop through these instead?
    const card = document.querySelector('#card');
    const locationDisplay = card.querySelector('#location');
    const forecastDisplay = card.querySelector('#forecast');
    const temperatureDisplay = card.querySelector('#temperature');
    const feelsLikeDisplay = card.querySelector('#feelsLike');
    const humidityDisplay = card.querySelector('#humidity');
    const windDisplay = card.querySelector('#wind');

    locationDisplay.innerText = weather.location;
    forecastDisplay.innerText = weather.forecast;
    temperatureDisplay.innerText = weather.temperature; //include unit and round number
    feelsLikeDisplay.innerText = 'Feels like: ' + weather.feelsLike;
    humidityDisplay.innerText = 'Humidity: ' + weather.humidity +'%';
    windDisplay.innerText = 'Wind: ' + weather.wind; //also metric or imperial?

}

function formProcessing() {
    const city = document.querySelector('#city');
    const unitList = document.querySelectorAll('.radio');
    let unit;
    for (i = 0; i < unitList.length; i++) {
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
    let params = formProcessing();
    let rawData = await getData(params.location, params.unitChoice);
    let processedData = createProfile(rawData);
    displayProfile(processedData);
}

const form = document.querySelector('form');
form.addEventListener('submit', formSubmission);