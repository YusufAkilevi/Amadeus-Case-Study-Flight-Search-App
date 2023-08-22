import { useState } from "react";
import "./App.css";
import FlightList from "./components/FlightList";
import FlightSearch from "./components/FlightSearch";

function App() {
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [flightsData, setFlightsData] = useState({
    gidişUçuşları: [],
    dönüşUçuşları: [],
  });

  const getFlightsData = (flights) => {
    setFlightsData(flights);
  };
  const getIsSearched = (isSearched) => {
    setIsSearched(isSearched);
  };
  const getIsLoading = (isLoading) => {
    setIsLoading(isLoading);
  };
  return (
    <>
      <FlightSearch
        onGetIsLoading={getIsLoading}
        onGetIsSearched={getIsSearched}
        onGetFlights={getFlightsData}
      />
      <FlightList
        isLoading={isLoading}
        isSearched={isSearched}
        flightsData={flightsData}
      />
    </>
  );
}

export default App;
