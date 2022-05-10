import React, {useState, useRef} from 'react';

import './InputCard.css'

const InputCard = (props) => {

    const [query, setQuery] = useState('');
    const inputRef = useRef();


    const onInputChange = (e) => {
        const inputQuery = e.target.value;
        if (inputQuery === '') {
            props.setError("You did not enter anything. Please enter location!");
            return
        }

        setQuery(inputQuery);
        props.setError('')
    }
    
    const onEnterPress = (e) => {
        e.preventDefault();
        props.getLocationWeather(query)
        setQuery('')
   }
    
    
    return (
        <div className='card'>
            <form className='input-form' onSubmit={onEnterPress}>
                
                <input
                    ref={inputRef}
                    type='text'
                    placeholder='Enter location'
                    className='input-form-field'
                    onChange={onInputChange}
                    value={query}    
                />
                {props.error && <p className='error-message'>{props.error}</p>}
                </form>
                <div>
                <button
                    className='input-form-btn'
                    onClick={() =>props.removeForm()}
                >
                        Remove
                    </button>
            </div>
        </div>
    );
};

export default InputCard;