import React, { useContext, useState } from 'react';
import './FloatMenu.scss';

const FloatMenu = (props) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [seedInputValue, setSeedInputValue] = useState(props.seed || '');

    return (
        <div className={`float-menu  ${menuOpen ? 'menu-open' : 'menu-closed'}`}>
            <div className="toggle-area">
                <input 
                    type="text" 
                    value={seedInputValue}
                    className="seed-input"
                    onChange={(e) => {setSeedInputValue(e.target.value.substring(0, 13).toUpperCase())}}
                    spellCheck="false"
                />
                
                <button
                    onClick={() => props.handleSeedChange(seedInputValue)}
                    disabled={seedInputValue === props.seed}
                    className="update-seed"
                >
                    Update
                </button>
            </div>

            <div className="visible-area">
                <button className="fold-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    <span role="img" aria-label="open seed menu">🌱</span>
                </button>
               
            </div>
        </div>
    )
};

export default FloatMenu;