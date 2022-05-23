import React, { useEffect, useState } from "react";
import "./css/style.css";

const Tempapp = () => {
  const [city, setCity] = useState(null);

  const [country, setCountry] = useState(null);

  const [condition, setCondition] = useState("clouds");

  const [search, setSearch] = useState("Raipur");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=b94af49b22bcac2f16de067259aa0882`;
      const response = await fetch(url);

      const resJson = await response.json();

      //   console.log(resJson);
      setCity(resJson.main);

      setCountry(resJson.sys);

      setCondition(resJson.weather[0]);
    };
    fetchApi();
  }, [search]);

  const getWeatherCon = (str) => {
    if (str === "Clouds") {
      return <i className="fa-solid fa-cloud cloud"></i>;
    } else if (str === "Clear") {
      return <i class="fa-solid fa-sun sun"></i>;
    } else if (str === "Rain") {
      return <i class="fa-solid fa-cloud-rain rain"></i>;
    } else if (str === "Haze") {
      return <i class="fa-solid fa-sun sun"></i>;
    } else if (str === "Thunderstorm") {
      return <i class="fa-solid fa-cloud-bolt bolt"></i>;
    } else {
      return <i class="fa-solid fa-sun sun"></i>;
    }
  };

  return (
    <div className="container">
      <div className="box">
        <div className="logo">
          <div className="logo-pic">
            <i className="fa-solid fa-cloud"></i>
          </div>
          <div className="logo-name"> weatherinfo</div>
        </div>

        <div className="inputData">
          <input
            type="search"
            value={search}
            className="inputFeild"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          ></input>
        </div>
      </div>

      {!city ? (
        <p className="errorMsg">No Data Found</p>
      ) : (
        <div className="card">
          <div className="info">
            {getWeatherCon(condition.main)}
            <div className="condition">{condition.main}</div>
            <h2 className="location">
              <i className="fa-solid fa-street-view"></i>
              {search} , {country.country}
            </h2>
            <h1 className="temp">{city.temp}॰Cel</h1>
            <h3 className="tempmin_max">
              Min : {city.temp_min}॰Cel | Max :{city.temp_max}॰Cel
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tempapp;
