import React, { useContext, useState } from 'react';
import SeedContext from './App';

const FloatMenu = () => {
    console.log(SeedContext);
    return (
        <div class="float-menu">
            <div>
                <h2>Seed:</h2>
                <input type="text"/>
            </div>
            <button><span role="img" aria-label="change seed">🌱</span></button>
        </div>
    )
};

export default FloatMenu;