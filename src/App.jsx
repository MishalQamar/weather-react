import { useState, useEffect } from "react";

import "./App.css";
import DateToday from "./components/Date";
import Time from "./components/Time";
import City from "./components/City";
import Loader from "./components/Loader";
import ForecastList from "./components/ForecastList";
import CurrentWeather from "./components/CurrentWeather";

import { APIKEY, API_URL } from "./api";

export default function App() {
  const [{ lat, lng }, setPosition] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherToday, setWeatherToday] = useState({});
  const [forecastWeather, setForecastWeather] = useState([]);

  useEffect(
    function () {
      if (!navigator.geolocation)
        return setError("Your browser does not support geolocation");

      setIsLoading(true);

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );

      const getWeatherData = async function () {
        if (lat === undefined || lng === undefined) return;
        try {
          const response = await fetch(
            `${API_URL}?lat=${lat}&lon=${lng}&appid=${APIKEY}&units=metric`
          );
          if (!response.ok) throw response;
          const dataWeather = await response.json();

          const { list } = dataWeather;

          const presentDay = new Date().toLocaleString("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });

          const forecastList = list
            .filter(
              (item) =>
                item.dt_txt.includes("12:00:00") &&
                !item.dt_txt.includes(presentDay)
            )
            .map((element) => [
              element.dt_txt,
              element.main.temp,
              element.weather[0].description,
              element.weather[0].icon,
            ]);

          setForecastWeather(forecastList);

          const currentWeather = dataWeather.list[0];

          const {
            main: { temp: currTemp },
            weather: [{ main, description, icon }],
          } = currentWeather;

          const weatherToday = {
            currTemp,
            main,
            description,
            icon,
          };

          setWeatherToday(weatherToday);
          setIsLoading(false);
        } catch (err) {
          setError(err.statusText || err.message);
        }
      };
      getWeatherData();
    },
    [lat, lng]
  );

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="main">
      <City lat={lat} lng={lng} />
      <div className="current-data">
        <DateToday className="date" />

        <CurrentWeather weatherToday={weatherToday} />

        <Time />
      </div>

      <div className="forecast-weather">
        <ForecastList forecastWeather={forecastWeather} />
      </div>
    </div>
  );
}
