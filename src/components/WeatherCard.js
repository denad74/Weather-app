import React from 'react';
import ReactCountryFlag from "react-country-flag"
import ReactTooltip from "react-tooltip";
import './WeatherCard.css'

const WeatherCard = ({ location, icon, removeLocation }) => {
    // const [weatherLocation, setWeatherLocation] =useState([])
   
    //console.log(location);
    // console.log(location);

    const weather = location.map((loc, i) => {
      
    
            return <div className='card' key={i}>
                <ReactTooltip />
                <div className='location'>
                    <div className='city'>{loc.location.name}</div>
                    <div className='country'>
                        <ReactCountryFlag
                            className="emojiFlag"
                            countryCode={loc.location.sys.country}
                            style={{
                                fontSize: '2em',
                                lineHeight: '2em',
                            }}
                            aria-label="United States"
                        />
                    </div>
                </div>
                <div className='weather-info'>
                    <div className='weather-info-details'>{Math.round(loc.location.main.temp)} °C</div>
                    <div className='weather-info-details'></div><img data-tip={loc.location.weather[0].description} className='weather-icon' src={`${icon}${loc.location.weather[0].icon}.png`} alt='Weather icon'></img>
                    <div className='weather-info-details'>{loc.location.wind.speed}km/h</div>
                    <div className='arrow' style={{ transform: `rotate(${loc.location.wind.deg}deg)` }}></div>
                    
                </div>
                
                {/* <span class="tooltiptext"></span> */}
            
                <div>
                    <button
                        className='input-form-btn'
                        onClick={() => removeLocation(loc.id)}
                    >
                        Remove
                    </button>
                </div>
            </div>
              
      
});

      
//console.log(weatherLocation);
    
    return (
        <> 
        
           {weather}   
    </>
         
    )
};

export default WeatherCard;