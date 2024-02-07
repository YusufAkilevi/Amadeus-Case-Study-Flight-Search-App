import classes from "./AirportItem.module.css";

const AirportItem = ({ airport, onSelect, type }) => {
  const clickHandler = () => {
    onSelect(airport, type);
  };

  return (
    <li className={classes["airport-item"]} onClick={clickHandler}>
      <span>
        {airport.name} ({airport.code}) {airport.city}, {airport.country}
      </span>
    </li>
  );
};

export default AirportItem;
