const express = require("express");
const cors = require("cors");
const { flights } = require("./flightData");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/flights", (req, res) => {
  const gidişUçuşları = flights.filter((flight) => {
    if (
      flight.nereden === req.body.kalkışYeri &&
      flight.nereye === req.body.varışYeri &&
      flight.gidişTarihi === req.body.gidişTarihi
    ) {
      return flight;
    }
  });
  const dönüşUçuşları = flights.filter((flight) => {
    if (
      flight.nereden === req.body.varışYeri &&
      flight.nereye === req.body.kalkışYeri &&
      flight.gidişTarihi === req.body.dönüşTarihi
    ) {
      return flight;
    }
  });

  res.json({ gidişUçuşları, dönüşUçuşları });
});

app.listen(3000, () => console.log("App is running on port 3000"));
