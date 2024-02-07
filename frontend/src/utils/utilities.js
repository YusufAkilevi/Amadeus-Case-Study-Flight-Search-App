import { SORTINGTYPES } from "../common/constants";

export const formatFlightDate = (date) => {
  return new Intl.DateTimeFormat("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

export const formatFlightTime = (time) => {
  return new Date(time).toLocaleString("en-UK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // or false for 24-hour format
  });
};

export const sortFlights = (flights, sortParam) => {
  let sortedFlights = flights;

  switch (sortParam) {
    case SORTINGTYPES.ARRIVAL:
      sortedFlights = flights.sort(
        (a, b) => new Date(a.arrivalTime) - new Date(b.arrivalTime)
      );
      break;
    case SORTINGTYPES.DEPARTURE:
      sortedFlights = flights.sort(
        (a, b) => new Date(a.departureTime) - new Date(b.departureTime)
      );
      break;
    case SORTINGTYPES.PRICE:
      sortedFlights = flights.sort(
        (a, b) => new Date(a.price) - new Date(b.price)
      );
      break;
    case SORTINGTYPES.DURATION:
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
