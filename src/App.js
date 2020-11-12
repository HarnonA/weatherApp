import './App.css' // add styles
import Weather from './components/Weather' // import of component
import { useEffect, useState } from 'react';



function App() {
  // hooks for coordinates
  const [coord, setCoord] = useState({ lat: -999, long: -999 });

  // Call the function once when it mounts
  useEffect(() => {
    getCoordinates()
  }, [])


  /*
  This function gets the latitude and longitude through the navigator
  permission is required:
  if denied, it won't show any data
  if allowed, it will call useState to set the coordinates
   */
  function getCoordinates() {
    const location = window.navigator && window.navigator.geolocation;

    console.log("pega coordenadas")

    if (location) {
      location.getCurrentPosition(async position => {
        await setCoord({
          lat: position.coords.latitude,
          long: position.coords.longitude
        })
      }, error => console.log("Couldn't get geolocation"))
    }
  }

  

  return (
    <div className="App">
      <div className="card">

        {/*
        If coordinates where set, it creater a component to
        show the weather passing an object with data

        If not, it will show an error message,
        by default latitude and longitude are -999,
        
        */}
        {coord.lat == -999
          ? "Couldn't get geolocation"
          : <Weather {...coord} />}
      </div>
    </div>
  );
}

export default App;
