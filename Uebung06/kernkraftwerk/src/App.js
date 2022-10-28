import React from 'react';
import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Circle} from 'react-leaflet';


function App() {

  React.useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
  }, []);

  var openstreetmap = (<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
/>);

  var swisstopo = (<TileLayer url = "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"
                  attribution='&copy; swisstopo'></TileLayer>);

  

  const Circlestyle_g = {color:'green', weight: 5};
  const Circlestyle_m = {color:'blue', weight: 5};
  const Circlestyle_b = {color:'red', weight: 5};
  const Circlestyle_l = {color:'yellow', weight: 5};

  const AKW = [
    [47.36940, 7.96582],
    [46.96758, 7.25533],
    [47.55142, 8.22403],
    [47.60120, 8.17689]
  ]

return (
  <MapContainer center={[46.87983, 8.25201]} zoom={7} scrollWheelZoom={true}>
  
  {openstreetmap}


  <Marker position={AKW[0]}>
    <Popup>
      AKW Gösgen
    </Popup>
  </Marker>
  <Marker position={AKW[1]}>
    <Popup>
      AKW Mühleberg
    </Popup>
  </Marker>
  <Marker position={AKW[2]}>
    <Popup>
      AKW Beznau
    </Popup>
  </Marker>
  <Marker position={AKW[3]}>
    <Popup>
      AKW Leibstadt
    </Popup>
  </Marker>

  <Circle center={AKW[0]} radius={[50000]} pathOptions={Circlestyle_g}></Circle>
  <Circle center={AKW[1]} radius={[50000]} pathOptions={Circlestyle_m}></Circle>
  <Circle center={AKW[2]} radius={[50000]} pathOptions={Circlestyle_b}></Circle>
  <Circle center={AKW[3]} radius={[50000]} pathOptions={Circlestyle_l}></Circle>

</MapContainer>
  );
}

export default App;

