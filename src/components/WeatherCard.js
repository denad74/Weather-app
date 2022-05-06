import React from 'react';
import ReactCountryFlag from "react-country-flag"
import ReactTooltip from "react-tooltip";
import './WeatherCard.css'

const WeatherCard = ({location, icon, removeLocation}) => {
   // console.log(location);

    const weather = location ? location.map((loc, index) => (
       
            
        <div className='card' key={index}>
            <ReactTooltip />
                <div className='location'>
                    <div className='city'>{loc.name}</div>
                    <div className='country'>
                        <ReactCountryFlag
                            className="emojiFlag"
                            countryCode={loc.sys.country}
                            style={{
                                fontSize: '2em',
                                lineHeight: '2em',
                            }}
                            aria-label="United States"
                        />
                    </div>
                </div>
                <div className='weather-info'>
                    <div className='weather-info-details'>{Math.round(loc.main.temp)} °C</div>
                    <div className='weather-info-details'></div><img data-tip={loc.weather[0].description} className='weather-icon' src={`${icon}${loc.weather[0].icon}.png`} alt='Weather icon'></img>
                    <div className='weather-info-details'>{loc.wind.speed}km/h</div>
                    <div className='arrow' style={{ transform: `rotate(${loc.wind.deg}deg)` }}></div>
                    
                </div>
                
                 {/* <span class="tooltiptext"></span> */}
            
            <div>
                <button
                    className='input-form-btn'
                    onClick={()=> removeLocation(loc.id)}
                >
                    Remove
                </button>
            </div>
        </div>
        
    )) : 'loading...';

    
    return (
        <> 
           {weather}   
    </>
         
    )
};

export default WeatherCard;