import React from 'react'
import { useState } from 'react'
import "./Weather.css"


const Weather = () => {
  const [temp, settemp] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [city, setcity] = useState("");
  const [weather, setweather] = useState("");
  const [icon, seticon] = useState("");
  const [humidity, sethumidity] = useState("")
  const [loading, setLoading] = useState(false);
  const [info, setinfo] = useState("");
  const [wind, setwind] = useState("")
  const api = "9724c1c1a22f58185d6658466a8aa90a"

  const HandleClick = () => {
    if (inputCity.trim() === "") {
      alert("Please enter a city name.");
      return;
    }
    setLoading(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${api}&units=metric`)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== 200) {
          alert("City not found!");
          clearWeatherData();
          return;
        }
        setcity(data.name)
        settemp(data.main.temp)
        setweather(data.weather[0].main)
        seticon(data.weather[0].icon)
        sethumidity(data.main.humidity)
        setinfo(data.weather[0].description)
        setwind(data.wind.speed)
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        alert("City not found or something went wrong!");
        clearWeatherData();
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const clearWeatherData = () => {
    setcity("");
    settemp("");
    setweather("");
    seticon("");
    sethumidity("");
    setinfo("");
    setwind("");
  };

  const handleInputChange = (e) => {
    setInputCity(e.target.value);
    clearWeatherData();
  };

  return (
    <>
      <div className='container'>
        <div className="head">Weather Forecasting App </div>
        <label htmlFor='name' className='name'>
          Name of the city:
        </label>
        <input type="text" id="name" className='name' placeholder="Write here" value={inputCity} onChange={handleInputChange}/>
        <button onClick={(HandleClick)} className='btn' disabled={loading}>
          Show
        </button>
      </div>

      <div className='detail'>
        {loading && <div className='loading'>Loading...</div>}
        {!loading && city && <div className='city'>City:{city}</div>}
        {!loading && temp && <div className='temp'>Temperature: {temp}°C</div>}
        {!loading && weather && <div className='weather'>Weather: {weather}</div>}
        {!loading && humidity && <div className='humidity'>Humidity: {humidity}%</div>}
        {!loading && wind && <div className='wind'>Wind speed: {wind}km/h</div>}
        {!loading && icon && (
          <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" />
        )}
        {!loading && info && <div className='info'>Description: {info}</div>}
      </div>
    </>
  )
}

export default Weather;
