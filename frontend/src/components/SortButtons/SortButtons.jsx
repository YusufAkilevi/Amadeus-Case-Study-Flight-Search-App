import classes from "./SortButtons.module.css";
import { SORTINGTYPES } from "../../common/constants";

const SortButtons = ({ onSort, sortParam }) => {
  return (
    <div className={classes.sorting}>
      <h4>Sort by</h4>
      <div className={classes["sort-buttons"]}>
        <button
          data-sorttype={SORTINGTYPES.DEPARTURE}
          className={sortParam === SORTINGTYPES.DEPARTURE ? classes.active : ""}
          onClick={onSort}
        >
          Departure Time
        </button>
        <button
          data-sorttype={SORTINGTYPES.ARRIVAL}
          className={sortParam === SORTINGTYPES.ARRIVAL ? classes.active : ""}
          onClick={onSort}
        >
          Arrival Time
        </button>
        <button
          data-sorttype={SORTINGTYPES.PRICE}
          className={sortParam === SORTINGTYPES.PRICE ? classes.active : ""}
          onClick={onSort}
        >
          Increasing by Price
        </button>
        <button
          data-sorttype={SORTINGTYPES.DURATION}
          className={sortParam === SORTINGTYPES.DURATION ? classes.active : ""}
          onClick={onSort}
        >
          Flight Duration
        </button>
      </div>
    </div>
  );
};

export default SortButtons;
