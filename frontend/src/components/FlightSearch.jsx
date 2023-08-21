import { useEffect, useState } from "react";
import classes from "./FlightSearch.module.css";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Autocomplete, TextField } from "@mui/material";
import Button from "@mui/material/Button";

const autoCompleteOptions = [
  "Ankara",
  "İstanbul",
  "Antalya",
  "Adana",
  "İzmir",
  "Bursa",
].sort();

const FlightSearch = (props) => {
  const [isSearched, setIsSearched] = useState(false);
  const [direction, setDirection] = useState("");
  const [kalkışYeri, setKalkışYeri] = useState("");
  const [varışYeri, setVarışYeri] = useState("");
  const [gidişTarihi, setGidişTarihi] = useState("");
  const [dönüşTarihi, setDönüşTarihi] = useState("");

  useEffect(() => {
    props.onGetIsSearched(isSearched);
  }, [isSearched]);

  const placeChangeHandler = (e, val) => {
    if (e.target.id.startsWith("gidiş")) setKalkışYeri(val);
    else if (e.target.id.startsWith("varış")) setVarışYeri(val);
  };

  const directionHandler = (e) => {
    if (e.target.value === "one-way") setDönüşTarihi("");
    else if (e.target.value === "round-trip") setDönüşTarihi();
    setDirection(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setIsSearched(true);
    fetch("https://amadeus-case-study-flight-search-app.onrender.com/flights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kalkışYeri,
        varışYeri,
        gidişTarihi: new Date(gidişTarihi.$d).toLocaleDateString(),
        dönüşTarihi: new Date(dönüşTarihi.$d).toLocaleDateString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.onGetFlights(data);
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
              value="one-way"
            />
            <label htmlFor="">Tek Yön</label>
          </div>
          <div>
            <input
              onClick={directionHandler}
              type="radio"
              name="direction"
              value="round-trip"
            />
            <label htmlFor="">Gidiş-Dönüş</label>
          </div>
        </div>
        <div className={classes.input}>
          <Autocomplete
            id="gidiş"
            options={autoCompleteOptions}
            renderInput={(params) => <TextField {...params} label="Nereden" />}
            onChange={placeChangeHandler}
          />
        </div>
        <div className={classes.input}>
          <Autocomplete
            id="varış"
            options={autoCompleteOptions}
            renderInput={(params) => <TextField {...params} label="Nereye" />}
            onChange={placeChangeHandler}
          />
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            minDate={dayjs("2023-08-23")}
            maxDate={dayjs("2023-08-30")}
            label="Gidiş Tarihi"
            onChange={setGidişTarihi}
          />
          <DatePicker
            onChange={setDönüşTarihi}
            disabled={direction === "one-way" ? true : false}
            minDate={dayjs("2023-08-23")}
            maxDate={dayjs("2023-08-30")}
            label="Dönüş Tarihi"
          />
        </LocalizationProvider>
        <Button onClick={submitHandler} variant="contained">
          Uçuş Ara
        </Button>
      </form>
    </div>
  );
};
export default FlightSearch;
