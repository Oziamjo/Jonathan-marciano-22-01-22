import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "react-reveal/Fade";

import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../../redux/favoritesSlice";
import { setCity } from "../../redux/citySlice";
import { ThemeContext } from "../../App";
import FutureWeather from "../FutureWeather/FutureWeather";
import CitySearchInput from "../CitySearchInput/CitySearchInput";
import styles from "./styles.module.scss";

function Homepage() {
  const { isDarkMode } = useContext(ThemeContext);

  const favoriteCities = useSelector((state) => state.favorites);
  const cityData = useSelector((state) => state.city);
  const dispatch = useDispatch();

  const [openErrorToast, setOpenErrorToast] = useState(false);
  const [tempScale, setTempScale] = useState("celsius");

  const [currentWeather, setCurrentWeather] = useState({});

  const getDefaultCity = async () => {
    let response = await axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_API_KEY}&q=32.109333,34.855499`
      )
      .then((res) => {
        dispatch(
          setCity({
            cityName: res.data.AdministrativeArea.LocalizedName,
            country: res.data.Country.LocalizedName,
            id: res.data.Key,
          })
        );
      })
      .catch((err) => {
        console.warn(err);
        /*
        error logic
        */
      });
  };

  useEffect(() => {
    if (!cityData.id) {
      getDefaultCity();
    }
  }, []);

  const getCityWeather = async (cityKey) => {
    axios
      .get(
        `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => res.data[0])
      .then((res) => {
        setCurrentWeather({
          celsius: Math.round(res.Temperature.Metric.Value),
          fahrenheit: Math.round(res.Temperature.Imperial.Value),
          text: res.WeatherText,
        });
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (cityData.id) {
        await getCityWeather(cityData.id);
      }
    };
    fetchData();
  }, [cityData]);

  const isInFavorites = () => {
    for (let i = 0; i < favoriteCities.length; i++) {
      if (favoriteCities[i].id === cityData.id) {
        return true;
      }
    }
    return false;
  };

  const favoriteToggleHandler = (existsInFavorites) => {
    if (existsInFavorites === true) {
      dispatch(remove(cityData));
    } else {
      dispatch(
        add({
          cityName: cityData.cityName,
          country: cityData.country,
          id: cityData.id,
          celsius: currentWeather.celsius,
          fahrenheit: currentWeather.fahrenheit,
        })
      );
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorToast(false);
  };

  return (
    <Fade>
      <div>
        <div className={styles.searchWrappper}>
          <CitySearchInput setOpenErrorToast={setOpenErrorToast} />
        </div>

        <Snackbar
          open={openErrorToast}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Please use English characters only.
          </Alert>
        </Snackbar>

        <div className={isDarkMode ? styles.weatherBoxDark : styles.weatherBox}>
          <div className={styles.cityData}>
            {cityData.id && currentWeather.celsius ? (
              <>
                {cityData.cityName}, {cityData.country}
                <button
                  className={styles.favoritesToggleButton}
                  onClick={() => {
                    favoriteToggleHandler(isInFavorites());
                  }}
                >
                  {isInFavorites() ? (
                    <BsSuitHeartFill size={20} />
                  ) : (
                    <BsSuitHeart size={20} />
                  )}
                </button>
              </>
            ) : (
              <div />
            )}
          </div>
          <div className={styles.temperature}>
            {cityData.id && currentWeather.celsius ? (
              <>
                <h1>
                  {tempScale === "celsius"
                    ? currentWeather.celsius + "°C"
                    : currentWeather.fahrenheit + "°F"}
                </h1>
                <h3>{currentWeather.text}</h3>
              </>
            ) : (
              <CircularProgress />
            )}
          </div>

          <FormControl>
            <RadioGroup
              row
              aria-labelledby="radio-buttons-group"
              value={tempScale}
              name="radio-buttons-group"
              onChange={(e) => setTempScale(e.target.value)}
            >
              <FormControlLabel
                value="celsius"
                control={<Radio />}
                label="Celsius"
              />
              <FormControlLabel
                value="fahrenheit"
                control={<Radio />}
                label="Fahrenheit"
              />
            </RadioGroup>
          </FormControl>
          <p>
            ☀ Wherever you go, no matter what the weather, always bring your own
            sunshine. ☀
          </p>
        </div>

        <FutureWeather tempScale={tempScale} cityKey={cityData.id} />
      </div>
    </Fade>
  );
}

export default Homepage;
