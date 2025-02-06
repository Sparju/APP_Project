import { useState, useEffect } from 'react';
import axios from 'axios';
const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCitySearch, setIsCitySearch] = useState(true);
  const apiKey = '9741d1700ad6860a96e997c7ad17e54c'; // Replace with your actual API key


  const fetchWeatherData = async () => {
    if (!location) {
      setError("Please enter a location.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = isCitySearch
        ? `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
        : `https://api.openweathermap.org/data/2.5/weather?zip=${location}&appid=${apiKey}&units=metric`;

      const response = await axios.get(url);

      if (response.data.cod === "404") {
        setError("City or Pincode not found");
        setWeatherData(null);
      } else {
        setWeatherData(response.data);
      }
    } catch (err) {
      setError("Error fetching data, please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location, isCitySearch]);

  return (
    <div>
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          placeholder={isCitySearch ? "Enter City Name" : "Enter Pincode"}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={() => setIsCitySearch(!isCitySearch)}>
          {isCitySearch ? "Search by Pincode" : "Search by City"}
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
