import classes from "./FlightList.module.css";
import Flights from "../Flights/Flights";
import Loading from "../Loading/Loading";

const FlightList = ({ flightsData, isSearched, isLoading }) => {
  const isThereFlight =
    flightsData.departureFlights.length > 0 ||
    flightsData.returnFlights.length > 0;

  return (
    <div className={classes.container}>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          {isSearched && !isThereFlight && (
            <p className={classes.feedback}>Flights could not be found.</p>
          )}
          {!isSearched && !isThereFlight && (
            <p className={classes.feedback}>Search Flights!</p>
          )}
          {isSearched && isThereFlight && (
            <div
              className={
                flightsData.returnFlights.length > 0
                  ? classes.flightListBoth
                  : classes.flightListOne
              }
            >
              {flightsData.departureFlights.length > 0 && (
                <Flights flights={flightsData.departureFlights} />
              )}
              {flightsData.returnFlights.length > 0 && (
                <Flights flights={flightsData.returnFlights} />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default FlightList;
