import React, { useState } from 'react'
import './WeatherApp.css'

// importing all the assets
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import brokenClouds_icon from '../assets/broken-clouds.png';
import clearDay_icon from '../assets/clear-day.png';
import clearNight_icon from '../assets/clear-night.png';
import fewCloudDay_icon from '../assets/few-cloud-day.png';
import fewCloudNight_icon from '../assets/few-cloud-night.png';
import scattered_icon from '../assets/scattered-clouds.png';
import showerRain_icon from '../assets/shower-rain.png';
import thunderStrom_icon from '../assets/thunder-storm.png';

export const WeatherApp = () => {
    // declaring the api key
    let api_key = "3e0207d9327062d3ef4119e6d46f98e0";

    // using the useState that I learned in class
    const [wicon, setWicon] = useState(cloud_icon);

    // making the algorithm for search bar
    const search = async () => {
        // getting the name of the city that the user input
        const element = document.getElementsByClassName("cityInput")

        // if the input was void it will return nothing
        if(element[0].value === "") {
            return 0;
        }

        // directing the url to get API data based on the city input from user
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

        // fetch the API url
        let response = await fetch(url);
        let data = await response.json();

        // declare variabel that will be changed later on based on the result of data array from the API
        const humidity = document.getElementsByClassName("humidity-percentage");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");
        const description = document.getElementsByClassName("weather-description");

        // change the value of the variabel so it match the retrived data API
        humidity[0].innerHTML = data.main.humidity+" %";
        wind[0].innerHTML = data.wind.speed+" km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp)+"°C";
        location[0].innerHTML = data.name;
        description[0].innerHTML = data.weather[0].description;

        // change the icon based on the code that we get from the API
        if(data.weather[0].icon === "01d") {
            setWicon(clearDay_icon);
        } else if(data.weather[0].icon === "01n") {
            setWicon(clearNight_icon)
        } else if(data.weather[0].icon === "02d") {
            setWicon(fewCloudDay_icon);
        } else if(data.weather[0].icon === "02n") {
            setWicon(fewCloudNight_icon)
        }else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setWicon(scattered_icon);
        } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWicon(brokenClouds_icon);
        } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setWicon(showerRain_icon);
        } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(drizzle_icon);
        } else if (data.weather[0].icon === "11d" || data.weather[0].icon === "11n") {
            setWicon(thunderStrom_icon);
        } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWicon(snow_icon);
        } else {
            setWicon(clear_icon);
        }

    }

  return (
    <div className='container'>
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder='Search'/>
            <div className="search-icon" onClick={()=>{search()}}>
                <img src={search_icon} alt="search icon" />
            </div>
        </div>
        {/* <div className="data-container"></div> */}
        <div className="weather-image">
            <img src={wicon} alt="weather icon" />
        </div>
        <div className="weather-location">London</div>
        <div className="weather-temp">24°C</div>
        <div className="weather-description">Partly Cloudy</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} alt="humidity icon" className="icon" />
                <div className="data">
                    <div className="humidity-percentage">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} alt="wind icon" className="icon" />
                <div className="data">
                    <div className="wind-rate">18 km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}

