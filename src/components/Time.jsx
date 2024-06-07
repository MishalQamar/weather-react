import { useState, useEffect } from "react";
import Clock from "./Clock";

function Time() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours.toString().padStart(2, "0");

    return `${hours}:${minutes}${ampm}`;
  };

  return (
    <div className="time">
      <Clock time={time} />
      {formatTime(time)}
    </div>
  );
}

export default Time;
