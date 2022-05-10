import { useState, useEffect } from 'react';
import axios from 'axios'
import InputCard from './components/InputCard';
import WeatherCard from './components/WeatherCard'

import './App.css';


const icon = "http://openweathermap.org/img/wn/";

function App() {

  const apiData = {
    key: process.env.REACT_APP_API_KEY,
    // key: "db3c34743c6607852bc0a0dfca49bb0c",
    baseURL: "https://api.openweathermap.org/data/2.5/"
  };

  
  const [error, setError] = useState(null)

   useEffect(() => {
    const tempLoc = localStorage.getItem("location");
     const loadedLocation = JSON.parse(tempLoc);
     //console.log(loadedLocation);
    if (loadedLocation) {
      setWeatherLocation(loadedLocation);
    }
   }, []);

  const [weatherLocation, setWeatherLocation] = useState([]);

  const [showForm, setShowForm] = useState(false)

 // const [weather, setWeather] = useState({});


  // const setQueryOnSearch = (inputQuery) => {
  //   // console.log(inputQuery);
  //   setQuery(inputQuery)
  // }

  

  const getLocationWeather = async (query) => {
    // if (e.key === "Enter") {

      try {
        const response = await axios.get(`${apiData.baseURL}weather?q=${query}&units=metric&APPID=${apiData.key}`)
        console.log(response.data);
        setWeatherLocation([...weatherLocation, { location: response.data, id: new Date().getTime() }]);
        // setQuery('')
        setShowForm(false);
      } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 400) {
          setError("You did not enter anything. Please enter location!")
        }
         if (error.response.status === 404) {
          setError("You enter wrong location! Please enter location!")
        }
  };
      // fetch(`${apiData.baseURL}weather?q=${query}&units=metric&APPID=${apiData.key}`)
      //   .then(res => res.json())
      //   .then(result => {
      //     //console.log(result);
      //     setWeatherLocation([...weatherLocation, {location: result, id: new Date().getTime()}]);
      //     setQuery('')
      //     setShowForm(false);
      //   }).catch((err) => {
      //     console.log(err);
      //   })
    // }
  }

   useEffect(() => {
    const tempLocation = JSON.stringify(weatherLocation);
    localStorage.setItem("location", tempLocation);
   }, [weatherLocation]);
  
  const removeLocation = (id) => {
    // console.log(location);
    // console.log(id);
    const updateLocation = weatherLocation.filter((loc) => loc.id !== id);
    console.log(updateLocation);
    setWeatherLocation(updateLocation);
    setError('')
  };

  const removeForm = () => {
    setShowForm(false);
    setError('')
  }

  const addForm = () => {
    setShowForm(true)
  }

 

 // console.log(location);
  return (
    <div className='app'>
      <header className="header">
       <h1>Weather</h1>
      </header>

      <div className='weather-container'>
         <WeatherCard
          location={weatherLocation}
          icon={icon}
          removeLocation={removeLocation}
        />
        {showForm && <InputCard
          getLocationWeather={getLocationWeather}
          removeForm={removeForm}
          setError={setError}
          error={error}
        />}
        
      </div>
      <button
        disabled={showForm}
        className='btn-add'
        onClick={addForm}
      >
        +
      </button>
    </div>
  );
}

export default App;
