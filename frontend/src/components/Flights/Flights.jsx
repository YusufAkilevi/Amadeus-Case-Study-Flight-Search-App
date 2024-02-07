import classes from "./Flights.module.css";
import FlightDetail from "../FlightDetail/FlightDetail";
import { useState } from "react";

const Flights = ({ flights, direction }) => {
  const [showDetail, setShowDetail] = useState("");

  const clickHandler = (e) => {
    if (e.target.id === showDetail) setShowDetail("");
    else {
      setShowDetail(e.target.id);
    }
  };
  console.log(
    flights,
    new Date(flights[0].departureTime),
    new Date(flights[0].departureTime).getHours(),
    new Date(flights[0].departureTime).getMinutes()
  );
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
          <p>Duration</p>
          <p>Arrival Time</p>
          <p>Price</p>
        </div>
        {flights.map((flight) => (
          <li className={classes.flight} key={flight.code}>
            <div className={classes.flightInfo}>
              <div>
                <p className={classes.kalkışSaati}>
                  {new Date(flight.departureTime).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true, // or false for 24-hour format
                  })}
                </p>
                <p className={classes.kalkışYeri}>
                  {flight.departureAirport.name}
                </p>
              </div>
              <p className={classes.uçuşSüresi}>{flight.duration}</p>
              <div>
                <p className={classes.varışSaati}>{flight.arrivalTime}</p>
                <p className={classes.varışYeri}>
                  {flight.arrivalAirport.name}
                </p>
              </div>
              <p className={classes.fiyat}>{flight.price}</p>
            </div>
            <button
              id={flight.code}
              onClick={clickHandler}
              className={classes.detay}
            >
              Details
            </button>
            <FlightDetail flight={flight} show={showDetail === flight.code} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Flights;
