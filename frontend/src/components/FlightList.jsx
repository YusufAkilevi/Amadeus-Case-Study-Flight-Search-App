import classes from "./FlightList.module.css";
import Flights from "./Flights";
import Loading from "./UI/Loading";
const FlightList = ({ flightsData, isSearched, isLoading }) => {
  const isThereFlight =
    flightsData.gidişUçuşları.length > 0 ||
    flightsData.dönüşUçuşları.length > 0;

  return (
    <div className={classes.container}>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          {isSearched && !isThereFlight && (
            <p style={{ textAlign: "center", fontWeight: "700" }}>
              Aradığınız kriterlere göre uçuş bulunamadı.
            </p>
          )}
          {!isSearched && !isThereFlight && (
            <p style={{ textAlign: "center", fontWeight: "700" }}>
              Uçak bileti ara!
            </p>
          )}
          {isSearched && isThereFlight && (
            <div
              className={
                flightsData.dönüşUçuşları.length > 0
                  ? classes.flightListBoth
                  : classes.flightListOne
              }
            >
              {flightsData.gidişUçuşları.length > 0 && (
                <Flights
                  flights={flightsData.gidişUçuşları}
                  direction="Gidiş"
                />
              )}
              {flightsData.dönüşUçuşları.length > 0 && (
                <Flights
                  flights={flightsData.dönüşUçuşları}
                  direction="Dönüş"
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
