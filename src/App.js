import { React, useEffect, useState } from "react";
import logo from "./sunset.png";
import "./App.css";

function App() {
  const [unitMeasurement, setUnitMeasurement] = useState("metric");
  const [weatherType, setWeatherType] = useState();
  const [cityName, setCityName] = useState("Singapore");
  const [countryName, setCountryName] = useState();
  const [temp, setTemp] = useState();
  const [feelsLike, setFeelsLike] = useState();
  const [wind, setWind] = useState();
  const [humidity, setHumidity] = useState();
  const [degreeUnit, setDegreeUnit] = useState("°C");
  const [windSpeedUnit, setWindSpeedUnit] = useState("M/S");

  async function weather(city, unit) {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=e8e6c5c2e112a84464443a02dd4f187b`
      );

      const result = await weatherResponse.json();
      const countryCode = await result.sys.country;
      // const countryResponse = await fetch(
      //   `https://restcountries.eu/rest/v2/alpha?codes=${countryCode}`
      // );
      // const countryResult = await countryResponse.json();
      setCountryName(countryCode);
      setWeatherType(result.weather[0].main);
      setCityName(result.name);
      setTemp(parseInt(result.main.temp));
      setFeelsLike(parseInt(result.main.feels_like));
      setWind(parseInt(result.wind.speed));
      setHumidity(result.main.humidity);
    } catch (err) {
      console.log("err", err);
    }
  }

  const unitButtonClick = (e) => {
    if (e.target.id === "metric") {
      document.querySelector("#metric").classList.add("positive");
      document.querySelector("#imperial").classList.remove("positive");
      setDegreeUnit("°C");
      setWindSpeedUnit("M/S");
      setUnitMeasurement("metric");
    } else {
      document.querySelector("#metric").classList.remove("positive");
      document.querySelector("#imperial").classList.add("positive");
      setDegreeUnit("°F");
      setWindSpeedUnit("MPH");
      setUnitMeasurement("imperial");
    }
  };

  useEffect(() => {
    weather(cityName, unitMeasurement);
    if (unitMeasurement === "metric") {
      document.querySelector("#metric").classList.add("positive");
    } else {
      document.querySelector("#imperial").classList.add("positive");
    }
  });

  const assessInput = (e) => {
    const city = document.querySelector("#cityInput");

    if (
      (e.key === "Enter" || e.target.id === "searchButton") &&
      city.value !== ""
    ) {
      setCityName(city.value);
    }
  };

  const HeaderTitle = () => {
    return (
      <>
        <h1 className="ui center aligned icon header">
          <i>
            <img src={logo} width="100" height="100"></img>
          </i>
          <div className="content">Weather App</div>
        </h1>
      </>
    );
  };

  const SearchBar = () => {
    return (
      <div className="ui centered grid">
        <div className="ui action input">
          <input
            id="cityInput"
            type="text"
            placeholder="Input City Name"
            onKeyDown={(e) => assessInput(e)}
          ></input>
          <button
            className="ui icon button"
            id="searchButton"
            onClick={(e) => assessInput(e)}
          >
            <i
              className="search icon"
              id="searchButton"
              onClick={(e) => assessInput(e)}
            ></i>
          </button>
        </div>
      </div>
    );
  };

  const UnitButtons = () => {
    return (
      <div className="ui centered grid">
        <div className="row">
          <div className="ui buttons">
            <button
              id="metric"
              className="ui button"
              onClick={(e) => {
                unitButtonClick(e);
              }}
            >
              Metric
            </button>
            <div className="or"></div>
            <button
              id="imperial"
              className="ui button"
              onClick={(e) => {
                unitButtonClick(e);
              }}
            >
              Imperial
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Contents = () => {
    return (
      <div className="ui grid centered stackable container">
        {/* <div className="four wide column"></div> */}
        <div className="eight wide column" id="contentBox">
          <div className="row">
            <p id="locationLabel">
              {cityName}, {countryName}
            </p>
          </div>
          <div className="row">
            <div>
              <p id="weatherTypeLabel">{weatherType}</p>
            </div>
          </div>

          <div className="ui grid row" id="infoBox">
            <div className="four wide column right aligned" id="bigTempBox">
              <p id="bigTemp">{temp}</p>
            </div>
            <div className="one wide column left aligned" id="degreeUnit">
              {degreeUnit}
            </div>
            <div className="nine wide column left aligned" id="otherInfoBox">
              <div>
                Feels Like: {feelsLike} {degreeUnit}
              </div>
              <div>
                Wind Speed: {wind} {windSpeedUnit}
              </div>
              <div>humidity: {humidity}%</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Footer = () => {
    return (
      <div className="ui grid centered" id="footer">
        Icons made by{" "}
        <a href="http://www.freepik.com/" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    );
  };
  return (
    <>
      <HeaderTitle />
      <SearchBar />
      <UnitButtons />
      <Contents />
      <Footer />
    </>
  );
}

export default App;
