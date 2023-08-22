import classes from "./FlightDetail.module.css";
const FlightDetail = (props) => {
  return (
    <div className={props.show ? classes.show : classes.hide}>
      <p className={classes.firma}>{props.flight.firma}</p>
      <div className={classes.detail}>
        <span>{props.flight.kalkışSaati}</span>
        <span>
          {new Intl.DateTimeFormat("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(props.flight.gidişTarihi))}
        </span>
        <span>{props.flight.nereden}</span>
      </div>
      <div className={classes.detail}>
        <span>{props.flight.varışSaati}</span>
        <span>
          {new Intl.DateTimeFormat("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(props.flight.gidişTarihi))}
        </span>
        <span>{props.flight.nereye}</span>
      </div>
    </div>
  );
};
export default FlightDetail;
