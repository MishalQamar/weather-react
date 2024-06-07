import { intlFormat } from "date-fns";
import { useState, useEffect } from "react";

let weekday;
let rest;
let restOfDate;
function getWeekDay(date) {
  [weekday, ...rest] = date.split(" ");
  restOfDate = rest.join(" ");
  return { weekday, restOfDate };
}

function DateToday() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const result = intlFormat(new Date(), {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDate(result);
  }, []);

  getWeekDay(date);

  return (
    <div>
      <div className="date-day">{weekday}</div>
      <div>{restOfDate}</div>
    </div>
  );
}

export default DateToday;
