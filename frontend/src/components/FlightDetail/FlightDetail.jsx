import classes from "./FlightDetail.module.css";
import { formatFlightTime } from "../../utils/utilities";

const FlightDetail = ({ flight, show }) => {
  return (
    <div
      className={show ? `${classes.detail} ${classes.show}` : classes.detail}
    >
      <div className={classes.container}>
        <div className={classes["flight-info"]}>
          <span className={classes.time}>
            {formatFlightTime(flight.departureTime)}
          </span>
          <span className={classes.city}>{flight.departureAirport.city}</span>
        </div>
        <div className={classes.duration}>
          <div className={classes.line}></div>
          <div>
            <span>{flight.duration}</span>
          </div>
        </div>
        <div className={classes["flight-info"]}>
          <span className={classes.time}>
            {formatFlightTime(flight.arrivalTime)}
          </span>
          <span className={classes.city}>{flight.arrivalAirport.city}</span>
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.airport}>
          <span>{flight.departureAirport.name}</span>
        </div>
        <div className={classes["airline-container"]}>
          <span className={classes.code}>Flight Code: {flight.flightCode}</span>
          <span className={classes.airline}>Airline: {flight.airline}</span>
        </div>
        <div className={classes.airport}>
          <span>{flight.arrivalAirport.name}</span>
        </div>
      </div>
    </div>
  );
};
export default FlightDetail;
