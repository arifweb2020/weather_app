/**
 * Spin Loader
 * Author: Arif
 */
import React from 'react';
import './style.css'

function Loader(props) {
    return (
        <div className='spinLoader'>
            <div className='spinner-border text-primary circle' role='status'>
                <span className='sr-only' ></span>
            </div>
        </div>
    );
}

export default Loader;