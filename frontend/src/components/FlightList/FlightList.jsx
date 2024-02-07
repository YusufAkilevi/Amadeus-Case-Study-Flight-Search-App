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
            <p style={{ textAlign: "center", fontWeight: "700" }}>
              Flights could not be found.
            </p>
          )}
          {!isSearched && !isThereFlight && (
            <p style={{ textAlign: "center", fontWeight: "700" }}>
              Search Flights!
            </p>
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
                <Flights
                  flights={flightsData.departureFlights}
                  direction={`${flightsData.departureFlights[0].departureAirport.city} to ${flightsData.departureFlights[0].arrivalAirport.city}`}
                />
              )}
              {flightsData.returnFlights.length > 0 && (
                <Flights
                  flights={flightsData.returnFlights}
                  direction={`${flightsData.returnFlights[0].departureAirport.city} to ${flightsData.returnFlights[0].arrivalAirport.city}`}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default FlightList;
