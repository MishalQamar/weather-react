import ForecastDay from "./ForecastDay";

function ForecastList({ forecastWeather }) {
  return (
    <ul className="forecast-list">
      {forecastWeather.map((day) => (
        <ForecastDay
          key={day[0]}
          dateTime={day[0]}
          temp={day[1]}
          weather={day[2]}
          icon={day[3]}
        />
      ))}
    </ul>
  );
}

export default ForecastList;
