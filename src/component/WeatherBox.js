import React from "react";
import "../App.css";

const WeatherBox = (props) => {
  return (
    <div className="box">
      <h2 style={{ textAlign: "center" }}>{props?.place}</h2>
      <h1 className="temp">
        {props?.celsius}°C / {props?.fahrenheit}°F
      </h1>
      <h1 className="weather" style={{ textAlign: "center" }}>
        {props?.weather}
      </h1>
    </div>
  );
};

export default WeatherBox;
