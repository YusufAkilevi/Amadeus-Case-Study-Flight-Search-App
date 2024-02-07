import { useState } from "react";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

import classes from "./Flights.module.css";
import FlightDetail from "../FlightDetail/FlightDetail";
const Flights = ({ flights, direction }) => {
  const [showDetail, setShowDetail] = useState("");

  const clickHandler = (e) => {
    if (e.target.id === showDetail) {
      setShowDetail("");
    } else {
      setShowDetail(e.target.id);
    }
  };
  return (
    <div>
      <div className={classes.heading}>
        <h2>{direction}</h2>
        <p>
          {new Intl.DateTimeFormat("en-EN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(flights[0].departureTime))}
        </p>
      </div>
      <ul className={classes.flights}>
        <div key="title" className={classes.headings}>
          <p>Departure Time</p>
          <div></div>
          <p>Arrival Time</p>
          <p>Price</p>
          <div></div>
        </div>
        {flights.map((flight) => (
          <li className={classes.flight} key={flight.flightCode}>
            <div className={classes.flightInfo}>
              <div>
                <p className={classes["departure-time"]}>
                  {new Date(flight.departureTime).toLocaleString("en-UK", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false, // or false for 24-hour format
                  })}
                </p>
                <div className={classes.airport}>
                  <span className={classes.code}>
                    {flight.departureAirport.code}
                  </span>
                  <span className={classes.city}>
                    {flight.departureAirport.city}
                  </span>
                </div>
              </div>
              <div className={classes["destination-icon"]}>
                <TrendingFlatIcon />
                <p className={classes.duration}>
                  Flight duration <span>{flight.duration}</span>
                </p>
              </div>
              <div>
                <p className={classes["arrival-time"]}>
                  {new Date(flight.arrivalTime).toLocaleString("en-UK", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false, // or false for 24-hour format
                  })}
                </p>
                <div className={classes.airport}>
                  <span className={classes.code}>
                    {flight.arrivalAirport.code}
                  </span>
                  <span className={classes.city}>
                    {flight.arrivalAirport.city}
                  </span>
                </div>
              </div>
              <p className={classes.price}>TRY {flight.price}</p>
              <div className={classes.details}>
                <button
                  id={flight.flightCode}
                  onClick={clickHandler}
                  className={classes["detail-button"]}
                >
                  Details
                </button>
              </div>
            </div>

            <FlightDetail
              flight={flight}
              show={showDetail === flight.flightCode}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Flights;
