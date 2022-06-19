import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import styles from "./styles.module.scss";

const FutureWeather = (props) => {
  const [weeklyWeather, setWeeklyWeather] = useState([]);
  const city = useSelector((state) => state.city);

  const getFiveDaysWeather = async (cityKey) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let stringDay = "";
    let weeklyArr = weeklyWeather ?? [];

    await axios
      .get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${process.env.REACT_APP_API_KEY}&metric=true`
      )
      .then((res) => res.data.DailyForecasts)
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          stringDay = days[new Date(res[i].Date).getDay()];
          if (weeklyArr[i] === undefined) {
            weeklyArr[i] = { day: stringDay };
          }
          weeklyArr[i].minTempCelsius = Math.round(
            res[i].Temperature.Minimum.Value
          );
          weeklyArr[i].maxTempCelsius = Math.round(
            res[i].Temperature.Maximum.Value
          );
        }
      })
      .catch((err) => {
        console.warn(err);
      });

    await axios
      .get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${process.env.REACT_APP_API_KEY}&metric=false`
      )
      .then((res) => res.data.DailyForecasts)
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          stringDay = days[new Date(res[i].Date).getDay()];
          weeklyArr[i].minTempFahrenheit = Math.round(
            res[i].Temperature.Minimum.Value
          );
          weeklyArr[i].maxTempFahrenheit = Math.round(
            res[i].Temperature.Maximum.Value
          );
        }
      })
      .catch((err) => {
        console.warn(err);
      });

    setWeeklyWeather(weeklyArr);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (city && city.id) {
        await getFiveDaysWeather(city.id);
      }
    };
    fetchData();
  }, [city]);

  const showData = () => {
    return weeklyWeather.map((e, i) => {
      return (
        <div className={styles.futureWeatherBox} key={i}>
          <div className={styles.day}>{e.day}</div>
          <p>
            <br />
            {props.tempScale === "celsius" && e.minTempCelsius !== undefined && (
              <>
                {e.minTempCelsius}°C / {e.maxTempCelsius}°C
              </>
            )}
            {props.tempScale === "fahrenheit" &&
              e.minTempFahrenheit !== undefined && (
                <>
                  {e.minTempFahrenheit}°F / {e.maxTempFahrenheit}°F
                </>
              )}
          </p>
        </div>
      );
    });
  };

  return (
    <div className={styles.futureData} key={city.id}>
      {showData()}
    </div>
  );
};

export default FutureWeather;
