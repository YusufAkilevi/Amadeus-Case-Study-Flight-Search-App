import classes from "./OutBoundFlight.module.css";

const OutboundFlight = ({ flights }) => {
  return (
    <div>
      <div className={classes.heading}>
        <h2>Gidiş Uçuşları</h2>
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
          </li>
        ))}
      </ul>
    </div>
  );
};
export default OutboundFlight;
