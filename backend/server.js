const express = require("express");
const cors = require("cors");

const flights = require("./data/flights.json");
const airports = require("./data/airports.json");

const formattedDate = (date) => {
  // Create a date object using the input date
  const localDate = new Date(date);

  // Get the time zone offset in minutes and convert it to milliseconds
  const timeZoneOffset = localDate.getTimezoneOffset() * 60000;

  // Adjust the date by the time zone offset to get the correct local date
  // Then create a new Date object with this adjusted time
  const adjustedDate = new Date(localDate.getTime() - timeZoneOffset);

  // Convert the adjusted date to an ISO string and split to get the date part
  return adjustedDate.toISOString().split("T")[0];
};
const app = express();

app.use(cors());
app.use(express.json());

app.post("/flights", (req, res) => {
  const { departureAirport, arrivalAirport, departureDate, returnDate } =
    req.body;

  const departureFlights = flights.filter(
    (flight) =>
      flight.departureAirport.code === departureAirport &&
      flight.arrivalAirport.code === arrivalAirport &&
      formattedDate(flight.departureTime) === formattedDate(departureDate)
  );

  const returnFlights =
    returnDate !== "Invalid Date"
      ? flights.filter(
          (flight) =>
            flight.departureAirport.code === arrivalAirport &&
            flight.arrivalAirport.code === departureAirport &&
            formattedDate(flight.departureTime) === formattedDate(returnDate)
        )
      : [];

  res.json({ departureFlights, returnFlights });
});

app.get("/airports", (req, res) => {
  const { query } = req.query;

  if (query.length !== 0) {
    const filteredAirports = airports.filter(
      (airport) =>
        airport.name.toLowerCase().includes(query) ||
        airport.code.toLowerCase().includes(query) ||
        airport.city.toLowerCase().includes(query)
    );

    res.json(filteredAirports);
  }
});

app.listen(3000, () => console.log("App is running on port 3000"));
