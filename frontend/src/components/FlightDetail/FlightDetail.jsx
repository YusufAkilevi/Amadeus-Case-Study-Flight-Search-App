import SouthIcon from "@mui/icons-material/South";
import classes from "./FlightDetail.module.css";

const FlightDetail = ({ flight, show }) => {
  return (
    <div className={show ? classes.show : classes.hide}>
      {/* <p className={classes.airline}>{flight.airline}</p>
      <div className={classes.detail}>
        <span>{flight.departureTime}</span>
        <span>
          {new Intl.DateTimeFormat("en-EN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(flight.departureTime))}
        </span>
        <span>{flight.departureAirport.name}</span>
      </div>
      <div className={classes.detail}>
        <span>{flight.arrivalTime}</span>
        <span>
          {new Intl.DateTimeFormat("en-EN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(flight.arrivalTime))}
        </span>
        <span>{flight.arrivalAirport.name}</span>
      </div> */}
      <div className={classes.container}>
        <div className={classes["flight-info"]}>
          <span className={classes.time}>
            {new Date(flight.departureTime).toLocaleString("en-UK", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // or false for 24-hour format
            })}
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
            {new Date(flight.arrivalTime).toLocaleString("en-UK", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // or false for 24-hour format
            })}
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
