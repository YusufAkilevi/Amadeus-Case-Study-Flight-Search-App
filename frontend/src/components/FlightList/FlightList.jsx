import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";

import classes from "./FlightList.module.css";
import Flights from "../Flights/Flights";
import Loading from "../Loading/Loading";

const FlightList = ({ flightsData, isSearched, isLoading }) => {
  const [tabValue, setTabValue] = useState(0); // State to track the active tab

  const { departureFlights, returnFlights } = flightsData;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const isThereFlight = departureFlights.length > 0 || returnFlights.length > 0;

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
            <>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="flight tabs"
                >
                  <Tab label="Departure Flights" />
                  {returnFlights.length > 0 && <Tab label="Return Flights" />}
                </Tabs>
              </Box>
              <div className={classes["flight-list"]}>
                {tabValue === 0 && departureFlights.length > 0 && (
                  <Flights flights={departureFlights} />
                )}
                {tabValue === 1 && returnFlights.length > 0 && (
                  <Flights flights={returnFlights} />
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default FlightList;
