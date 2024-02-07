import { SORTINGTYPES } from "../common/constants";

/**
 * Formats a date string into a more readable format.
 * @param {string} date - The date string to format.
 * @returns {string} - A string representing the formatted date.
 */
export const formatFlightDate = (date) => {
  return new Intl.DateTimeFormat("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

/**
 * Formats a time string into a 24-hour format.
 * @param {string} time - The time string to format.
 * @returns {string} - A string representing the formatted time.
 */
export const formatFlightTime = (time) => {
  return new Date(time).toLocaleString("en-UK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // or false for 24-hour format
  });
};

/**
 * Sorts an array of flight objects based on a specified parameter.
 * @param {Array} flights - The array of flight objects to sort.
 * @param {string} sortParam - The parameter to sort by (arrival, departure, price, duration).
 * @returns {Array} - The sorted array of flight objects.
 */
export const sortFlights = (flights, sortParam) => {
  let sortedFlights = flights;

  switch (sortParam) {
    case SORTINGTYPES.ARRIVAL:
      // Sort flights by arrival time
      sortedFlights = flights.sort(
        (a, b) => new Date(a.arrivalTime) - new Date(b.arrivalTime)
      );
      break;
    case SORTINGTYPES.DEPARTURE:
      // Sort flights by departure time
      sortedFlights = flights.sort(
        (a, b) => new Date(a.departureTime) - new Date(b.departureTime)
      );
      break;
    case SORTINGTYPES.PRICE:
      // Sort flights by price
      sortedFlights = flights.sort((a, b) => a.price - b.price);
      break;
    case SORTINGTYPES.DURATION:
      // Sort flights by flight duration
      sortedFlights = flights.sort((a, b) => {
        const durationA = +a.duration.replace("h", "");
        const durationB = +b.duration.replace("h", "");

        if (durationA < durationB) {
          return -1;
        } else if (durationA > durationB) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
  }

  return sortedFlights;
};

/**
 * Fetches airport options based on the user's query.
 * @param {string} query - The user's search query.
 * @param {Function} setOptions - The state setter function to update the options.
 */
export const getAirportOptions = async (query, setOptions) => {
  if (query.length !== 0) {
    const res = await fetch(
      `http://localhost:3000/airports?query=${query.toLowerCase()}`
    );
    if (!res.ok) return;

    const data = await res.json();

    setOptions(data);
  } else {
    setOptions([]);
  }
};
