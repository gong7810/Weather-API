import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const WeatherButton = ({ cities, setPlace }) => {
  return (
    <div className="button">
      <div className="buttons">
        <Button
          variant="primary"
          onClick={() => setPlace("Current City")}
          style={{ marginRight: 10 }}
        >
          Current City
        </Button>
        {cities.map((city) => (
          <Button
            variant="warning"
            onClick={() => setPlace(city)}
            style={{ marginRight: 10 }}
          >
            {city}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default WeatherButton;
