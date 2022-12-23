import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography';
import "./Karte.css";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';


//import { MenuIcon } from '@mui/material/MenuItem';
//npm install @mui/icons-material

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}


function App() {
  const [lat, setLatitude] = useState(47.53486);
  const [lng, setLongtitude] = useState(7.64193);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [valueerrorlat, setValueErrorLat] = useState(null);
  const [valueerrorlng, setValueErrorLng] = useState(null);

  // useEffect( () => {console.log("");})
  useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });

  }, [])



  function download() {
    var url = `https://geodesy.geo.admin.ch/reframe/wgs84tolv95?easting=${lng}&northing=${lat}&format=json`;

    setLoading(true);
    axios.get(url).then( 
        (response) => { setData(response.data);}
      ).catch(
        (err) => {setError(err);}
      ).finally(
        () => {setLoading(false);}
      )
  }

  function karte() {
    var swisstopo = (<TileLayer url = "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"
                    attribution='&copy; swisstopo'></TileLayer>);

    return(<>
                      <MapContainer  center={[lat, lng]} zoom={15} scrollWheelZoom={false}>
                      <ChangeView center={[lat, lng]} zoom={15} />
                      {swisstopo}
                                         
                      <Marker position={[lat, lng]}>
                        <Popup>
                          <b>LV95 Koordinaten</b><br/><div>{(Math.round((data?.easting)*1000))/1000}</div><div>{(Math.round((data?.northing)*1000))/1000}</div>
                        </Popup>
                      </Marker>
                      
                      </MapContainer>
                    </>
                      );
  }



  return  <>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h5" color="inherit" component="div">
                Umrechner WGS84 zu LV95 Koordinaten
              </Typography>
            </Toolbar>
          </AppBar>
          <br></br>     
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <TextField label="Breite" variant="outlined" defaultValue={lat} onChange={
                (event) => {
                  if (event.target.value<45.8) {
                    setValueErrorLat("Breite muss > 45.8 sein");
                  }
                  else if (event.target.value>47.9)
                  {
                    setValueErrorLat("Breite muss < 47.9 sein");
                  }
                  else
                  {
                    setValueErrorLat(null);
                    setLatitude(event.target.value);}
                  }
                 }/>
                 {valueerrorlat && 
                  <><div>{valueerrorlat}</div></>
                 }
            </Grid>
            <Grid item xs={2}>
              <TextField label="Länge" variant="outlined" defaultValue={lng} onChange={
                 (event) => {
                  if (event.target.value<5.9) {
                    setValueErrorLng("Länge muss > 5.9 sein");
                  }
                  else if (event.target.value>10.5)
                  {
                    setValueErrorLng("Länge muss < 10.5 sein");
                  }
                  else
                  {
                    setValueErrorLng(null);
                    setLongtitude(event.target.value);}
                  }
                 
                 
                 }/>
                 {valueerrorlng && 
                  <><div>{valueerrorlng}</div></>
                 }
            </Grid>
            <Grid item xs={8}>
              <Button color="error" style={{float: 'right'}} as="a" href="https://www.swisstopo.admin.ch/de/wissen-fakten/geodaesie-vermessung/koordinaten/bezugssystem.html" target="blank" variant="contained" onClick={ () => { download()} }>Informationen WGS84</Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" onClick={ () => { download(); console.log(`${lng} - ${lat}`); karte(lat, lng);} }>berechnen</Button>
            </Grid>
            <Grid item xs={6}>
              {loading &&
                <h4>Bitte warten.... Die Daten werden geladen!!!</h4>
              }

              {error &&
                <h4>Fehler... Server Problem!!</h4>
              }

              {data &&
                <>
                  <h4>Daten geladen</h4>
                  
                </>
              }
            </Grid>
            <Grid item xs={2}>
              <TextField label="East" variant="outlined" defaultValue="East" value={(Math.round((data?.easting)*1000))/1000}/>
            </Grid>
            <Grid item xs={2}>
              <TextField label="North" variant="outlined" defaultValue="North" value={(Math.round((data?.northing)*1000))/1000}/> 
            </Grid>
            <Grid item xs={8}> 
              <Button color="error" style={{float: 'right'}} as="a" href="https://www.swisstopo.admin.ch/de/wissen-fakten/geodaesie-vermessung/bezugsrahmen/lokal/lv95.html" target="blank" variant="contained" onClick={ () => { download()} }>Informationen LV95</Button>
            </Grid>
            <Grid item xs={12}>
            {
             karte()
            }
            </Grid>
          </Grid> 
          </>
}

export default App;