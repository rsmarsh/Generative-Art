import React, { useContext, useState } from 'react';
import SeedContext from './App';

const FloatMenu = (props) => {
    return (
        <div className="float-menu">
            <div>
                <h2>Seed:</h2>
                <input 
                    type="text" 
                    value={props.seed}
                    onChange={(e) => {props.handleSeedChange(e.target.value)}}
                />
            </div>
            <button
                onClick={() => props.handleSeedChange(props.seed)}    
            ><span role="img" aria-label="change seed">🌱</span></button>
        </div>
    )
};

export default FloatMenu;