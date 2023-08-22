import classes from "./Flights.module.css";
import FlightDetail from "./FlightDetail";
import { useState } from "react";
const ReturningFlight = ({ flights, direction }) => {
  const [showDetail, setShowDetail] = useState("");

  const clickHandler = (e) => {
    if (e.target.id === showDetail) setShowDetail("");
    else {
      setShowDetail(e.target.id);
    }
  };
  return (
    <div>
      <div className={classes.heading}>
        <h2>{direction} Uçuşları</h2>
        <p>
          {new Intl.DateTimeFormat("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(flights[0].gidişTarihi))}
        </p>
      </div>
      <ul className={classes.flights}>
        <div className={classes.headings}>
          <p>Kalkış Saati</p>
          <p>Süre</p>
          <p>Varış Saati</p>
          <p>Fiyat</p>
        </div>
        {flights.map((flight) => (
          <li className={classes.flight} key={flight.id}>
            <div className={classes.flightInfo}>
              <div>
                <p className={classes.kalkışSaati}>{flight.kalkışSaati}</p>
                <p className={classes.kalkışYeri}>{flight.nereden}</p>
              </div>
              <p className={classes.uçuşSüresi}>{flight.uçuşSüresi}</p>
              <div>
                <p className={classes.varışSaati}>{flight.varışSaati}</p>
                <p className={classes.varışYeri}>{flight.nereye}</p>
              </div>
              <p className={classes.fiyat}>{flight.fiyat}</p>
            </div>
            <button
              id={flight.id}
              onClick={clickHandler}
              className={classes.detay}
            >
              Detay
            </button>
            <FlightDetail flight={flight} show={showDetail === flight.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ReturningFlight;
