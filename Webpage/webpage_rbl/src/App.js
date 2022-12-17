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
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import IconButton from '@mui/material/IconButton';
//import { MenuIcon } from '@mui/material/MenuItem';


function App() {
  const [lat, setLatitude] = useState(47.54268170654611);
  const [lng, setLongtitude] = useState(7.593689481072517);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

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
/*
    React.useEffect(() => {
      const L = require("leaflet");
  
      delete L.Icon.Default.prototype._getIconUrl;
  
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
      });
    }, []);
  */  
    var swisstopo = (<TileLayer url = "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"
                    attribution='&copy; swisstopo'></TileLayer>);

                    return (
                      <MapContainer center={[lat, lng]} zoom={15} scrollWheelZoom={true}>
                      
                      {swisstopo}
                      
                    
                      <Marker position={[lat, lng]}>
                        <Popup>
                          <b>umgerechnete Koordinate</b><br/><div>{data?.easting}</div><div>{data?.northing}</div>
                        </Popup>
                      </Marker>
                    
                    </MapContainer>
                      );
  }
  return  <>
          <AppBar position="static">
            <Toolbar variant="dense">
              <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                
              </IconButton>
              <Typography variant="h6" color="inherit" component="div">
                Umrechner WGS84 zu LV95
              </Typography>
            </Toolbar>
          </AppBar>
          <br></br>     
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="Breite" variant="outlined" defaultValue={lat} onChange={ (event) => {setLatitude(event.target.value)}}/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Länge" variant="outlined" defaultValue={lng} onChange={ (event) => {setLongtitude(event.target.value)}}/>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={ () => { download()} }>Calculate</Button>
            </Grid>
            <Grid item xs={6}>
              <TextField label="East" variant="outlined" defaultValue="East" value={data?.easting}/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="North" variant="outlined" defaultValue="North" value={data?.northing}/>
            </Grid>
            <Grid item xs={12} onChange={ (event) => {setLatitude(event.target.value) ; setLongtitude(event.target.value)}}>
            {
            karte()
            }
            </Grid>
            <Grid>
              {loading &&
                <h1>Bitte warten.... Die Daten werden geladen!!!</h1>
              }

              {error &&
                <h1>Fehler... Server Problem!!</h1>
              }

              {data &&
                <>
                  <h1>Daten geladen</h1>
                  <div>{data?.easting}</div>
                  <div>{data?.northing}</div>
                </>
              }
            </Grid>
          </Grid>   
          

        
          </>
}

export default App;

