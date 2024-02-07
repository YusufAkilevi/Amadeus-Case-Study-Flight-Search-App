const fs = require("fs");

// Assuming airports.js exports an array of airport objects
const airports = require("./airports");

const airlines = [
  "Emirates",
  "British Airways",
  "American Airlines",
  "Qantas",
  "Lufthansa",
  "Turkish Airlines",
];

// Calculate the start and end of February 2024
const startFebruary2024 = new Date(Date.UTC(2024, 1, 1)); // February 1, 2024
const endFebruary2024 = new Date(Date.UTC(2024, 1, 29)); // February 29, 2024 (2024 is a leap year)

function getRandomAirline() {
  return airlines[Math.floor(Math.random() * airlines.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateFlightsForFebruary() {
  let flights = [];
  let flightNumber = 1;

  for (
    let day = new Date(startFebruary2024);
    day <= endFebruary2024;
    day.setDate(day.getDate() + 1)
  ) {
    airports.forEach((departureAirport) => {
      airports.forEach((arrivalAirport) => {
        if (departureAirport.code !== arrivalAirport.code) {
          for (let i = 0; i < 4; i++) {
            // Generate 12 flights per day for each airport pair
            const departureTime = new Date(day);
            departureTime.setHours(2 * i, 0, 0); // Set flights 2 hours apart
            const durationHours = getRandomInt(1, 12); // Random duration between 1 and 12 hours
            const arrivalTime = new Date(
              departureTime.getTime() + durationHours * 60 * 60 * 1000
            ); // Random duration

            const flight = {
              flightCode: `FL${String(flightNumber++).padStart(3, "0")}`,
              departureAirport: departureAirport, // Use whole object
              arrivalAirport: arrivalAirport, // Use whole object
              departureTime: departureTime.toISOString(),
              arrivalTime: arrivalTime.toISOString(),
              price: getRandomInt(100, 2500), // Random price between $100 and $2500
              duration: `${durationHours}h`,
              airline: getRandomAirline(),
            };
            flights.push(flight);
          }
        }
      });
    });
    day.setHours(0); // Reset hours to avoid time zone issues
  }

  return flights;
}

// Generate flights for February 2024
const flights = generateFlightsForFebruary();

// Optionally, write the flights to a JSON file
fs.writeFile("flights.json", JSON.stringify(flights, null, 2), (err) => {
  if (err) throw err;
  console.log(
    "Flight data for February 2024 generated and saved to flights.json"
  );
});
