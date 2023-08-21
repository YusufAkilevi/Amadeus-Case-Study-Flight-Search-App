import { useEffect, useState } from "react";
import classes from "./FlightList.module.css";
import OutboundFlight from "./OutBoundFlight";
import ReturningFlight from "./ReturningFlight";
const FlightList = ({ flightsData, isSearched }) => {
  const isThereFlight =
    flightsData.gidişUçuşları.length > 0 ||
    flightsData.dönüşUçuşları.length > 0;

  return (
    <div className={classes.container}>
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
            <OutboundFlight flights={flightsData.gidişUçuşları} />
          )}
          {flightsData.dönüşUçuşları.length > 0 && (
            <ReturningFlight flights={flightsData.dönüşUçuşları} />
          )}
        </div>
      )}
    </div>
  );
};
export default FlightList;
