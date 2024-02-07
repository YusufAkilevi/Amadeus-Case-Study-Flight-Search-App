import { useEffect, useState } from "react";
import classes from "./FlightSearch.module.css";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Autocomplete, TextField, useThemeProps } from "@mui/material";
import Button from "@mui/material/Button";
import AirportOptions from "../AirportOptions/AirportOptions";
import { DIRECTIONS } from "../../common/constants";

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
  const [showDepartureAirportOptions, setShowDepartureAirportOptions] =
    useState(false);
  const [arrivalAirportOptions, setArrivalAirportOptions] = useState([]);
  const [showArrivalAirportOptions, setShowArrivalAirportOptions] =
    useState(false);

  useEffect(() => {
    onGetIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    onGetIsSearched(isSearched);
  }, [isSearched]);

  const placeChangeHandler = async (e) => {
    const { value, id } = e.target;
    if (id === "departure") {
      setDepartureAirport(value);
      setShowDepartureAirportOptions(true);
      await getAirportOptions(value, setDepartureAirportOptions);
    } else if (id === "arrival") {
      // setArrivalAirport(value);
      setShowArrivalAirportOptions(true);
      await getAirportOptions(value, setArrivalAirportOptions);
    }
  };
  const focusChangeHandler = (e) => {
    const { id } = e.target;
    // if (id === DIRECTIONS.DEPARTURE) {
    //   setShowDepartureAirportOptions(false);
    // } else if (id === "arrival") {
    //   setShowArrivalAirportOptions(false);
    // }
    setTimeout(() => {
      if (id === "departure") {
        setShowDepartureAirportOptions(false);
      } else if (id === "arrival") {
        setShowArrivalAirportOptions(false);
      }
    }, 200);
  };
  const directionHandler = (e) => {
    if (e.target.value === "one-way") {
      setReturnDate("");
    } else if (e.target.value === "round-trip") {
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
  const selectAirportHandler = (airport, type) => {
    if (type === "departure") {
      setDepartureAirport(airport);
    } else if (type === "arrival") {
      setArrivalAirport(airport);
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
              value="one-way"
              defaultChecked
            />
            <label htmlFor="">One way</label>
          </div>
          <div>
            <input
              onClick={directionHandler}
              type="radio"
              name="direction"
              value="round-trip"
            />
            <label htmlFor="direction">Round trip</label>
          </div>
        </div>
        <div className={classes["input-container"]}>
          <div className={classes.input}>
            {/* <TextField
              id="departure"
              label="From"
              // size="small"
              fullWidth
              value={departureAirport?.name}
              onChange={placeChangeHandler}
              onBlur={focusChangeHandler}
            />
            {departureAirportOptions.length > 0 &&
              showDepartureAirportOptions && (
                <AirportOptions
                  type="departure"
                  airportOptions={departureAirportOptions}
                  onSelect={selectAirportHandler}
                />
              )} */}
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
            {/* <TextField
              id="arrival"
              label="To"
              // size="small"
              fullWidth
              value={arrivalAirport?.name}
              onChange={placeChangeHandler}
              onBlur={focusChangeHandler}
            />
            {arrivalAirportOptions.length > 0 && showArrivalAirportOptions && (
              <AirportOptions
                type="arrival"
                airportOptions={arrivalAirportOptions}
                onSelect={selectAirportHandler}
              />
            )} */}
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
            <DatePicker
              size="small"
              minDate={dayjs("2024-02-01")}
              maxDate={dayjs("2024-02-29")}
              label="Departure Date"
              onChange={setDepartureDate}
            />
            <DatePicker
              onChange={setReturnDate}
              size="small"
              disabled={direction === "one-way" ? true : false}
              minDate={dayjs("2024-02-01")}
              maxDate={dayjs("2024-02-29")}
              label="Return Date"
            />
          </LocalizationProvider>
        </div>
        <Button onClick={submitHandler} variant="contained">
          Search Flight
        </Button>
      </form>
    </div>
  );
};
export default FlightSearch;
