import { ICON_API } from "../api";

function CurrentWeather({ weatherToday }) {
  return (
    <div className="current-weather">
      <p className="weather-item">{weatherToday.main}</p>

      <img
        className="weather-item"
        src={`${ICON_API}/${weatherToday.icon}@2x.png`}
      />
      <p className="weather-item">{weatherToday.currTemp}℃ </p>
    </div>
  );
}

export default CurrentWeather;
