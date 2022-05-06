import React from 'react';
import './InputCard.css'

const InputCard = (props) => {
    return (
        <div className='card'>
            <div className='input-form'>
                <input
                    type='text'
                    placeholder='Enter location'
                    className='input-form-field'
                    onChange={(e) => props.setQuery(e.target.value)}
                    value={props.query}
                    onKeyDown={props.onEnterPress}
                />
                </div>
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