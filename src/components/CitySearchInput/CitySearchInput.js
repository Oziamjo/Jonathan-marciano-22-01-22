import React, { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { setCity } from "../../redux/citySlice";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const CitySearchInput = (props) => {
  const [citiesOptions, setCitiesOptions] = useState([]);
  const dispatch = useDispatch();

  const getOptions = (query) => {
    axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${query}`
      )
      .then((res) => res.data)
      .then((res) => {
        if (res) {
          let newOptionsArr = [];
          res.forEach((element) => {
            newOptionsArr.push({
              cityName: element.LocalizedName,
              country: element.Country.LocalizedName,
              id: element.Key,
              key: element.Key,
            });
          });
          setCitiesOptions(newOptionsArr);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const onInputChangeHandler = (event, value) => {
    if (value == "") {
      setCitiesOptions([]);
    }
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(value)) {
      props.setOpenErrorToast(true);
    } else {
      getOptions(value);
    }
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        id="citiesSearch"
        onInputChange={(e, v) => onInputChangeHandler(e, v)}
        onChange={(e, v) => {
          if (v !== null) {
            dispatch(setCity(v));
            setCitiesOptions([]);
          }
        }}
        options={citiesOptions}
        getOptionLabel={(option) => option.cityName}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search City" />}
      />
    </div>
  );
};

export default CitySearchInput;
