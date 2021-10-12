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

async function formSubmission(event) {
    event.preventDefault();
    const city = document.querySelector('#city');
    const unitList = document.querySelectorAll('.radio');
    let unit;
    for (i = 0; i < unitList.length; i++) {
        if(unitList[i].checked) {
            unit = unitList[i];
        }
    }
    let a = await getData(city.value, unit.value);
    console.log(a)
    let b = createProfile(a);
    console.log(b);
}

const form = document.querySelector('form');
form.addEventListener('submit', formSubmission);
//getData('london', 'metric');