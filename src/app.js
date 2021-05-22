const currentConditions = document.querySelector('.current-conditions');
const forecast = document.querySelector('.forecast');
const urlCurrentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=Winnipeg&appid=77f787fd2498913938f8859c3cb24af0&units=metric';
const urlForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=Winnipeg&appid=77f787fd2498913938f8859c3cb24af0&units=metric';

const getWeatherData = async (url) => {
  const request = await fetch(url);
  const data = await request.json();
  return data;
}

const renderForecast = async () => {
  forecast.innerHTML = '';
  const data = await getWeatherData(urlForecast);
  for(i = 1; i < data.list.length; i++) {
    const date = new Date(data.list[i]['dt_txt']);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    console.log(date.toLocaleTimeString('en-US'));
    console.log(date.toLocaleDateString('en-US'));
    if (date.toLocaleTimeString('en-US') === `12:00:00 PM`) {
      data.list.forEach(forecastData => {
        forecast.insertAdjacentHTML('beforeend', 
        `<div class="day">
        <h3>${days[date.getDay()]}</h3>
        <img src="http://openweathermap.org/img/wn/${forecastData.weather[0].icon}@2x.png" />
        <div class="description">${forecastData.weather[0].description}</div>
        <div class="temp">
        <span class="high">${
          parseInt(forecastData.main['temp_max'])}℃</span>/<span class="low">${parseInt(forecastData.main['temp_min'])}℃</span>
          </div>
          </div>`);
      });
    }
  };
}

const renderCurrentWeather = async() => {
  currentConditions.innerHTML = '';
  const data = await getWeatherData(urlCurrentWeather);
  data.weather.forEach(weatherData => {
    currentConditions.insertAdjacentHTML('beforeend', 
    `
    <div class="current-conditions">
      <h2>Current Conditions</h2>
      <img src="http://openweathermap.org/img/wn/${weatherData.icon}@2x.png" />
      <div class="current">
        <div class="temp">${parseInt(data.main.temp)}</div>
        <div class="condition">${weatherData.description}</div>
      </div>
    </div>
    `);
  });
}

getWeatherData(urlCurrentWeather)
.then((data) => {
  console.log(data);
  renderCurrentWeather(data);
})
.catch(err => console.log(err));

getWeatherData(urlForecast)
.then((data) => {
  console.log(data);
  renderForecast(data);
})
.catch(err => console.log(err));