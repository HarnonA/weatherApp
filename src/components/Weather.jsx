import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './styles.css';


function Weather(props) {
	// Call the function once when it mounts
	useEffect(() => getWeather(), [])

	// hooks for weather information
	const [weatherInfo, setInfo] = useState({
		city: "Maceió",
		img: `http://openweathermap.org/img/wn/09d.png`,
		condition: "cloudy",
		temp: 32,
		humidity: 20,
		wind: 10,

	});

	/*
	Get data from OpenWeatherMap API
	Key is required
	creates an object with data specified in function 'showWeather'

	it uses axios to do a GET from the API, 
	wait the promisse and then set the hook state
	when update, the component will re-render
	*/
	function getWeather() {

		axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.long}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
			.then(res => {
				let response = {
					temp: res.data.main.temp,
					humidity: res.data.main.humidity,
					cityName: res.data.name,
					condition: res.data.weather[0].description,
					img: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`,
					wind: res.data.wind.speed

				}
				setInfo({ ...response });
			}).catch(err => console.log(err))

	}

	/*
	Create a component that shows the data received from API
	City name,
	wheather condition and one icon
	temperature in celsius
	humidity
	wind velocity in m/s tansformed in km/h
	*/
	function showWeather() {
		return <div>
			<p className={"city"}>{weatherInfo.city}</p>
			<img src={weatherInfo.img} />
			<p>{weatherInfo.condition}</p>
			<div className="temp">
				<p className={"temperature"}>{(0 + weatherInfo.temp).toFixed(1)}</p>
				<p> °C</p>
			</div>

			<p>Humidity: {weatherInfo.humidity} %</p>
			<p>Wind: {(weatherInfo.wind * 3.6).toFixed(1)} km/h</p>
		</div>

	}




	return (
		<div className={"WeatherCard"}>
			{showWeather()}
		</div>

	);
}

export default Weather;