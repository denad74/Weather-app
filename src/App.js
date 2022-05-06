import { useState, useEffect } from 'react';

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

  const [query, setQuery] = useState('');

  const [location, setLocation] = useState([]);

  const [showForm, setShowForm] = useState(false)

 // const [weather, setWeather] = useState({});

   useEffect(() => {
    const tempLoc = localStorage.getItem("location");
    const loadedLocation = JSON.parse(tempLoc);
    if (loadedLocation) {
      setLocation(loadedLocation);
    }
   }, []);
  
  useEffect(() => {
    const tempLocation = JSON.stringify(location);
    localStorage.setItem("location", tempLocation);
  }, [location]);



  const setQueryOnSearch = (inputQuery) => {
    console.log(inputQuery);
    setQuery(inputQuery)
  }



  const getLocationWeather = (e) => {
    if (e.key === "Enter") {
      fetch(`${apiData.baseURL}weather?q=${query}&units=metric&APPID=${apiData.key}`)
        .then(res => res.json())
        .then(result => {
          //console.log(result);
          setLocation([...location, result]);
          setQuery('')
          setShowForm(false);
        }).catch((err) => {
          console.log(err.massage);
        })
    }
  }

  const removeLocation = (id) => {
    // console.log(location);
    // console.log(id);
    const updateLocation = location.filter((loc) => loc.id !== id);
    console.log(updateLocation);
    setLocation(updateLocation);
  };

  const removeForm = () => {
    setShowForm(false);
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
          location={location}
          icon={icon}
          removeLocation={removeLocation}
        />
        {showForm && <InputCard
          setQuery={setQueryOnSearch}
          onEnterPress={getLocationWeather}
          query={query}
          removeForm={removeForm}
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
