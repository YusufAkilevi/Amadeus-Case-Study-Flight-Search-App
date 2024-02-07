import AirportItem from "./AirportItem";
import classes from "./AirportOptions.module.css";

const AirportOptions = ({ airportOptions, onSelect, type }) => {
  return (
    <ul className={classes["airport-options"]}>
      {airportOptions.map((port) => (
        <AirportItem
          type={type}
          key={port.code}
          airport={port}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
};

export default AirportOptions;
