import { useState } from "react";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

import classes from "./Flights.module.css";
import FlightDetail from "../FlightDetail/FlightDetail";
import {
  formatFlightDate,
  formatFlightTime,
  sortFlights,
} from "../../utils/utilities";

import SortButtons from "../SortButtons/SortButtons";

const Flights = ({ flights, direction }) => {
  const [showDetail, setShowDetail] = useState("");
  const [sortParam, setSortParam] = useState("");

  const detailsClickHandler = (e) => {
    if (e.target.id === showDetail) {
      setShowDetail("");
    } else {
      setShowDetail(e.target.id);
    }
  };

  const sortButtonHandler = (e) => {
    const { sorttype } = e.target.dataset;
    setSortParam(sorttype);
  };

  return (
    <div>
      <div className={classes.heading}>
        <h2>{direction}</h2>
        <p>{formatFlightDate(flights[0].departureTime)}</p>
      </div>
      <SortButtons sortParam={sortParam} onSort={sortButtonHandler} />
      <ul className={classes.flights}>
        <div key="title" className={classes.headings}>
          <p>Departure Time</p>
          <div></div>
          <p>Arrival Time</p>
          <p>Price</p>
          <div></div>
        </div>
        {sortFlights(flights, sortParam).map((flight) => (
          <li className={classes.flight} key={flight.flightCode}>
            <div className={classes.flightInfo}>
              <div>
                <p className={classes["departure-time"]}>
                  {formatFlightTime(flight.departureTime)}
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
                  {formatFlightTime(flight.arrivalTime)}
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
                  onClick={detailsClickHandler}
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
