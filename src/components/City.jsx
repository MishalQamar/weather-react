import { useState, useEffect } from "react";

import { GEOLOCATION_KEY, GEO_API_URL } from "../api";

function City({ lat, lng }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (lat === undefined || lng === undefined) return;
    const getCity = async () => {
      try {
        const response = await fetch(
          `${GEO_API_URL}?lat=${lat}&lon=${lng}&limit=1&appid=${GEOLOCATION_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();

        setCity(data[0].name);
      } catch (err) {
        setError(err.message);
      }
    };

    getCity();
  }, [lat, lng]);

  if (error) return <p>{error} </p>;

  return (
    <>
      <p className="main-title">
        <span> Latest Weather </span> {city}{" "}
      </p>
    </>
  );
}

export default City;
