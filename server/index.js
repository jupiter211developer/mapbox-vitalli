const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions =  {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.get("/points", (req, res) => {
  const { lat, lon } = req.query;
  const offsetLat = 0.3, offsetLon = 0.3
  const points = [];
  let count = 50;

  while (count--) {
    const dx = offsetLat * Math.random() - offsetLat / 2;
    const dy = offsetLon * Math.random() - offsetLat / 2;
    points.push([parseFloat(lat) + dx, parseFloat(lon) + dy]);
  }

  res.json(points);
});

app.listen(4000, () => {
    console.log("Listen on the port 4000...");
});