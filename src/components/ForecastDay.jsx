import { format } from "date-fns";
import { ICON_API } from "../api";

function ForecastDay({ dateTime, temp, weather, icon }) {
  const [date] = dateTime.split(" ");
  const dt = date.split("-").join(",");

  const day = format(new Date(dt), " eeee");
  return (
    <li className="forecast-day ">
      <p className="weather-item   forecast-weekday">{day}</p>

      <img className="weather-item" src={`${ICON_API}/${icon}@2x.png`} />
      <p className="weather-item">{weather}</p>
      <p className="weather-item">{temp}℃</p>
    </li>
  );
}

export default ForecastDay;
