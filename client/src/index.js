import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import axios from "axios";
import "./styles.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibWF5b2ppY2giLCJhIjoiY2pla3Q3MzVvMWRoYTJybnVyMndxM2hmdCJ9.nWZlYcpKaMqz6m7xTsnJGA"
});

function App() {
  const [points, setPoints] = useState([]);
  const [center] = useState([101.8224, 2.955139]);

  useEffect(() => {
    axios.get(`http://localhost:4000/points?lat=${center[0]}&lon=${center[1]}`)
      .then((resp) => {
        setPoints(resp.data);
        console.log(resp.data);
      });
  }, []);

  return (
    <div className="App">
      <h2>Center: { center[0].toFixed(6) }, { center[1].toFixed(6) }</h2>
      <Map
        style="mapbox://styles/mapbox/streets-v8"
        zoom={[10.5]}
        center={center}
        containerStyle={{
          height: "60vh",
          width: "100vw"
        }}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          {
            points.map((point, index) => (
              <Feature coordinates={point} key={index} />
            ))
          }
        </Layer>
      </Map>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
