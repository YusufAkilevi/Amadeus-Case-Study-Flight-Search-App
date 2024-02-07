import classes from "./FlightDetail.module.css";
const FlightDetail = ({ flight, show }) => {
  return (
    <div className={show ? classes.show : classes.hide}>
      <p className={classes.firma}>{flight.airline}</p>
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
      </div>
    </div>
  );
};
export default FlightDetail;
