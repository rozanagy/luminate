import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";

import cities from "../../constants/cities";

const Input = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState({ label: "" });
  const [candleTime, setCandleTime] = useState("");

  console.log(city);
  const handleOnChange = (event, values) => {
    setCity(values);
  };

  const handleOnClick = () => {
    fetch(`https://www.hebcal.com/shabbat?cfg=json&city=${city.label}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setCandleTime(result?.items[0]?.title);
          //   console.log(result?.items[0]?.title);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }
      );
  };

  return (
    <>
      <Autocomplete
        value={city}
        disablePortal
        id="combo-box-demo"
        options={cities}
        sx={{ width: 300 }}
        onChange={handleOnChange}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField {...params} label="Cities" placeholder="Select a city" />
        )}
      />
      <Button onClick={handleOnClick}>Submit</Button>
      {candleTime && <p>{candleTime}</p>}
    </>
  );
};

export default Input;
