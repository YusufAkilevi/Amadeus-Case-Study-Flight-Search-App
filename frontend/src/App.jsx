import { useState } from "react";
import "./App.css";
import FlightList from "./components/FlightList";
import FlightSearch from "./components/FlightSearch";

function App() {
  const [isSearched, setIsSearched] = useState(false);
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
  return (
    <>
      <FlightSearch
        onGetIsSearched={getIsSearched}
        onGetFlights={getFlightsData}
      />
      <FlightList isSearched={isSearched} flightsData={flightsData} />
    </>
  );
}

export default App;
