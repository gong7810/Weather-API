import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";

// 1. 앱이 실행되지마자 현재 위치기반의 날씨정보가 보인다.
// 2. 날씨정보에는 도시, 섭씨, 화씨, 날씨상태
// 3. 5개의 버튼이 있다. 1개는 현재위치, 4개는 다른 도시
// 4. 버튼을 클릭하면 그 위치기반의 날씨정보로 update 된다.
// 5. 데이터를 들고오는 동안 로딩 스피너가 돈다.

const API_KEY = "bea3119d0c9e2fbee700dfa18473dfc9";
function App() {
  const [place, setPlace] = useState();
  const [celsius, setCelsius] = useState();
  const [fahrenheit, setFahrenheit] = useState();
  const [weather, setWeather] = useState();

  // App에서 배열로 관리하는것이 유지보수측면에서 좋다
  const cities = ["New York", "Paris", "London", "Tokyo"];

  const getCurrentWeather = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    await fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        setCelsius(json.main.temp); // 섭씨온도
        let tempF = (json.main.temp * 9) / 5 + 32;
        setFahrenheit(Math.round((tempF + Number.EPSILON) * 100) / 100); // 화씨온도
        setPlace(json.name); // 사용자 위치
        setWeather(json.weather[0].description);
      });
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("현재위치 :", lat, " , ", lon);
      await getCurrentWeather(lat, lon);
    });
  };

  useEffect(() => {
    getCurrentLocation();
    // api 호출
  }, []);

  useEffect(() => {
    console.log(place);
    if (place === "Current City") getCurrentLocation();
    else {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}&units=metric`;

      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          setCelsius(json.main.temp); // 섭씨온도
          let tempF = (json.main.temp * 9) / 5 + 32;
          setFahrenheit(Math.round((tempF + Number.EPSILON) * 100) / 100); // 화씨온도
          setPlace(json.name); // 사용자 위치
          setWeather(json.weather[0].description);
        });
    }
  }, [place]);

  return (
    <div>
      <div className="container">
        <WeatherBox
          place={place}
          celsius={celsius}
          fahrenheit={fahrenheit}
          weather={weather}
        />
        <WeatherButton cities={cities} setPlace={setPlace} />
      </div>
    </div>
  );
}

export default App;
