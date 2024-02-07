import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Autocomplete, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

import classes from "./FlightSearch.module.css";
import { DIRECTIONS, TRIPTYPE } from "../../common/constants";

const getAirportOptions = async (query, setOptions) => {
  if (query.length !== 0) {
    const res = await fetch(
      `http://localhost:3000/airports?query=${query.toLowerCase()}`
    );
    if (!res.ok) return;

    const data = await res.json();

    setOptions(data);
  } else {
    setOptions([]);
  }
};

const FlightSearch = ({ onGetIsLoading, onGetIsSearched, onGetFlights }) => {
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState("one-way");

  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");

  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [departureAirportOptions, setDepartureAirportOptions] = useState([]);
  const [arrivalAirportOptions, setArrivalAirportOptions] = useState([]);

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

  const directionHandler = (e) => {
    if (e.target.value === TRIPTYPE.ONE_WAY) {
      setReturnDate("");
    } else if (e.target.value === TRIPTYPE.ROUND_TRIP) {
      setReturnDate();
    }
    setDirection(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSearched(true);

    fetch("http://localhost:3000/flights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        departureAirport: departureAirport.code,
        arrivalAirport: arrivalAirport.code,
        departureDate: new Date(departureDate.$d).toLocaleDateString(),
        returnDate: new Date(returnDate.$d).toLocaleDateString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        onGetFlights(data);
        setIsLoading(false);
      });
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
              value={TRIPTYPE.ONE_WAY}
              defaultChecked
            />
            <label htmlFor="">One way</label>
          </div>
          <div>
            <input
              onClick={directionHandler}
              type="radio"
              name="direction"
              value={TRIPTYPE.ROUND_TRIP}
            />
            <label htmlFor="direction">Round trip</label>
          </div>
        </div>
        <div className={classes["input-container"]}>
          <div className={classes.input}>
            <Autocomplete
              id="departure"
              // sx={{ width: 200 }}
              fullWidth={true}
              autoComplete
              onChange={(e, value) => {
                setDepartureAirport(value);
              }}
              onInputChange={placeChangeHandler}
              options={departureAirportOptions}
              getOptionLabel={(option) =>
                `${option.name} (${option.code}) - ${option.city}, ${option.country}`
              }
              renderInput={(params) => (
                <TextField {...params} label="From" fullWidth />
              )}
            />
          </div>
          <div className={classes.input}>
            <Autocomplete
              id="arrival"
              // sx={{ width: 300 }}
              fullWidth={true}
              autoComplete
              onChange={(e, value) => {
                setArrivalAirport(value);
              }}
              onInputChange={placeChangeHandler}
              options={arrivalAirportOptions}
              getOptionLabel={(option) =>
                `${option.name} (${option.code}) - ${option.city}, ${option.country}`
              }
              renderInput={(params) => (
                <TextField {...params} label="To" fullWidth />
              )}
            />
          </div>
        </div>
        <div className={classes["date-container"]}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={classes.date}>
              <DatePicker
                sx={{ width: "100%" }}
                minDate={dayjs("2024-02-01")}
                maxDate={dayjs("2024-02-29")}
                label="Departure Date"
                onChange={setDepartureDate}
              />
            </div>
            <div className={classes.date}>
              <DatePicker
                onChange={setReturnDate}
                sx={{ width: "100%" }}
                disabled={direction === TRIPTYPE.ONE_WAY ? true : false}
                minDate={dayjs("2024-02-01")}
                maxDate={dayjs("2024-02-29")}
                label="Return Date"
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
