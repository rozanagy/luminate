import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { format } from "date-fns";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import cities from "../../constants/cities";

const theme = createTheme({
  palette: {
    primary: {
      main: "#A6C8C7",
      contrastText: "#fff",
    },
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: "white",
      },
    },
  },
});

const FormComponent = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState({ label: "" });
  const [candleTime, setCandleTime] = useState("");
  const [date, setDate] = useState("");

  const handleOnChange = (event, values) => {
    setCity(values);
  };

  const handleOnClick = () => {
    setIsLoading(true);
    fetch(`https://www.hebcal.com/shabbat?cfg=json&city=${city.label}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setDate(result?.items[0]?.date);
          setCandleTime(result?.items[0]?.title);
          setIsLoading(false);
        },
        (error) => {
          setError(error.message);
          setIsLoading(false);
        }
      );
  };

  return (
    <>
      <Grid
        container
        spacing={5}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Autocomplete
            value={city}
            disablePortal
            id="combo-box-demo"
            options={cities}
            sx={{ width: 300 }}
            onChange={handleOnChange}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cities"
                placeholder="Select a city"
              />
            )}
          />
        </Grid>
        <Grid item>
          <ThemeProvider theme={theme}>
            <Button
              onClick={handleOnClick}
              variant="contained"
              disabled={!city}
            >
              Submit
            </Button>
          </ThemeProvider>
        </Grid>
        <Grid item>
          {candleTime && (
            <div>
              <p>
                Light the Sabbath candles on{" "}
                {format(new Date(date), "yyyy.MM.dd")} at
                {candleTime.slice(candleTime.indexOf(":") + 1)}
              </p>
            </div>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          {isLoading && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default FormComponent;
