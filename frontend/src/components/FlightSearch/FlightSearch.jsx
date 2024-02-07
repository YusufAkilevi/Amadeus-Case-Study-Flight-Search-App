import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Autocomplete, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import "dayjs/locale/tr";

import classes from "./FlightSearch.module.css";
import { DIRECTIONS, TRIPTYPES, DATEPICKER } from "../../common/constants";
import { getAirportOptions } from "../../utils/utilities";

const FlightSearch = ({ onGetIsLoading, onGetIsSearched, onGetFlights }) => {
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState(TRIPTYPES.ONE_WAY);

  const [departureAirport, setDepartureAirport] = useState(null);
  const [arrivalAirport, setArrivalAirport] = useState(null);

  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const [departureAirportOptions, setDepartureAirportOptions] = useState([]);
  const [arrivalAirportOptions, setArrivalAirportOptions] = useState([]);

  const [error, setError] = useState({
    departureAirport: false,
    arrivalAirport: false,
    departureDate: false,
    returnDate: false,
  });

  useEffect(() => {
    onGetIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    onGetIsSearched(isSearched);
  }, [isSearched]);

  const placeChangeHandler = async (e) => {
    const { value, id } = e.target;
    if (id === DIRECTIONS.DEPARTURE) {
      await getAirportOptions(value, setDepartureAirportOptions);
    } else if (id === DIRECTIONS.ARRIVAL) {
      await getAirportOptions(value, setArrivalAirportOptions);
    }
  };
  const datePickerChangeHandler = (newValue, id) => {
    if (id === DATEPICKER.DEPARTURE) {
      setDepartureDate(newValue);
      setError((prevState) => ({ ...prevState, departureDate: false }));
    } else if (id === DATEPICKER.ARRIVAL) {
      setReturnDate(newValue);
      setError((prevState) => ({ ...prevState, returnDate: false }));
    }
  };
  const autocompleteChangeHandler = (e, value) => {
    const id = e.target.id.split("-")[0];

    if (id === DIRECTIONS.DEPARTURE) {
      setDepartureAirport(value);
      setError((prevState) => ({ ...prevState, departureAirport: false }));
    } else if (id === DIRECTIONS.ARRIVAL) {
      setArrivalAirport(value);
      setError((prevState) => ({ ...prevState, arrivalAirport: false }));
    }
  };
  const directionHandler = (e) => {
    if (e.target.value === TRIPTYPES.ONE_WAY) {
      setReturnDate();
      setError((prevState) => ({ ...prevState, returnDate: false }));
    } else if (e.target.value === TRIPTYPES.ROUND_TRIP) {
      setReturnDate();
    }
    setDirection(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSearched(true);

    if (
      !departureAirport ||
      !arrivalAirport ||
      !departureDate ||
      (!returnDate && direction !== TRIPTYPES.ONE_WAY)
    ) {
      setError({
        departureAirport: !departureAirport,
        arrivalAirport: !arrivalAirport,
        departureDate: !departureDate,
        returnDate:
          direction !== TRIPTYPES.ONE_WAY && !returnDate ? !returnDate : false,
      });
      setIsLoading(false);
      return;
    } else {
      setError({
        departureAirport: !departureAirport,
        arrivalAirport: !arrivalAirport,
        departureDate: !departureDate,
        returnDate:
          direction !== TRIPTYPES.ONE_WAY && !returnDate ? !returnDate : false,
      });
    }

    try {
      const response = await fetch("http://localhost:3000/flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          departureAirport: departureAirport.code,
          arrivalAirport: arrivalAirport.code,
          departureDate: new Date(departureDate?.$d).toLocaleDateString(),
          returnDate: new Date(returnDate?.$d).toLocaleDateString(),
        }),
      });
      if (!response.ok) {
        throw new Error("Flight could not be found!");
      }
      const data = await response.json();
      onGetFlights(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.direction}>
          <div>
            <input
              onClick={directionHandler}
              type="radio"
              name="direction"
              value={TRIPTYPES.ONE_WAY}
              defaultChecked
            />
            <label htmlFor="">One way</label>
          </div>
          <div>
            <input
              onClick={directionHandler}
              type="radio"
              name="direction"
              value={TRIPTYPES.ROUND_TRIP}
            />
            <label htmlFor="direction">Round trip</label>
          </div>
        </div>
        <div className={classes["input-container"]}>
          <div className={classes.input}>
            <Autocomplete
              id={DIRECTIONS.DEPARTURE}
              fullWidth={true}
              autoComplete
              onChange={autocompleteChangeHandler}
              onInputChange={placeChangeHandler}
              options={departureAirportOptions}
              getOptionLabel={(option) =>
                `${option.name} (${option.code}) - ${option.city}, ${option.country}`
              }
              renderInput={(params) => (
                <TextField
                  error={error.departureAirport}
                  {...params}
                  label="From"
                  fullWidth
                  helperText={
                    error.departureAirport ? "This field is required!" : ""
                  }
                />
              )}
            />
          </div>
          <div className={classes.input}>
            <Autocomplete
              id={DIRECTIONS.ARRIVAL}
              fullWidth={true}
              autoComplete
              onChange={autocompleteChangeHandler}
              onInputChange={placeChangeHandler}
              options={arrivalAirportOptions}
              getOptionLabel={(option) =>
                `${option.name} (${option.code}) - ${option.city}, ${option.country}`
              }
              renderInput={(params) => (
                <TextField
                  error={error.arrivalAirport}
                  {...params}
                  label="To"
                  fullWidth
                  helperText={
                    error.arrivalAirport ? "This field is required!" : ""
                  }
                />
              )}
            />
          </div>
        </div>
        <div className={classes["date-container"]}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
            <div className={classes.date}>
              <DatePicker
                onChange={(newValue) =>
                  datePickerChangeHandler(newValue, DATEPICKER.DEPARTURE)
                }
                sx={{ width: "100%" }}
                minDate={dayjs("2024-02-01")}
                maxDate={dayjs("2024-02-29")}
                label="Departure Date"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined",
                    error: error.departureDate,
                    helperText: error.departureDate
                      ? "This field is required!"
                      : "",
                  },
                }}
              />
            </div>
            <div className={classes.date}>
              <DatePicker
                onChange={(newValue) =>
                  datePickerChangeHandler(newValue, DATEPICKER.ARRIVAL)
                }
                sx={{ width: "100%" }}
                disabled={direction === TRIPTYPES.ONE_WAY}
                minDate={dayjs(departureDate)}
                maxDate={dayjs("2024-02-29")}
                label="Return Date"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined",
                    error: error.returnDate,
                    helperText: error.returnDate
                      ? "This field is required!"
                      : "",
                  },
                }}
              />
            </div>
          </LocalizationProvider>
        </div>
        <Button onClick={submitHandler} variant="contained">
          <SearchIcon />
        </Button>
      </form>
    </div>
  );
};
export default FlightSearch;
