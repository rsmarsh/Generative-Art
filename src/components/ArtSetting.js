import React, { useState } from 'react';

import './ArtSetting.scss';

let handleSettingChangeCallback;

const ArtSetting = (props) => {

    const [value, setValue] = useState(props.setting.default);
    handleSettingChangeCallback = props.handleSettingChange;

    return (
        <div className="art-setting">
            {renderSetting(props.setting, {value, setValue})}
        </div>
    );
}


const handleInputChange = (e, setting, hooks) => {
    let newValue;

    switch(e.target.type){
        case 'checkbox':
            newValue = e.target.checked;
            break;
        case 'range':
            newValue = Number(e.target.value);
            break;
        case 'number':
            newValue = Number(e.target.value);
            break;
        case 'select-one':
            newValue = e.target.value;
            break;
        default:
            return;
    }

    
    // trigger a rerender with this inputs newest value
    hooks.setValue(newValue);

    // inform the ArtContainer that a setting has been changed
    handleSettingChangeCallback(setting.property, newValue);

}

const renderSetting = (setting, hooks) => {
        let input;
        
        switch(setting.type) {
            case 'checkbox':
                input = renderCheckbox(setting, hooks);
                break;
            case 'slider': 
                input = renderSlider(setting, hooks);
                break;
            case 'number':
            case 'text':
                input = renderInput(setting, hooks);
                break;
            case 'select':
                input = renderSelect(setting, hooks);
                break;
            default:
                return <p>invalid setting found</p>
        }

        // wrap the input in a label before returning
        return (
            <label className="artwork-label">
                <p className="setting-name">{setting.label}</p>
                {input}
            </label>
        );
    };
    
 
const renderCheckbox = (setting, hooks) => {
    return (
        <input 
            type="checkbox" 
            defaultChecked={hooks.value}
            onChange={e => {handleInputChange(e, setting, hooks)}}
        />
    );
};

const renderSlider = (setting, hooks) => {

    // don't allow a render with a value exceeding the min/max bounds
    if (hooks.value < setting.bounds.min) {
        hooks.setValue(setting.bounds.min);
        return;
    }
    if (hooks.value > setting.bounds.max) {
        hooks.setValue(setting.bounds.max);
        return;
    } 

    return (
        <div className="setting-group">
            <input 
                type="range"
                min={setting.bounds.min} 
                max={setting.bounds.max} 
                value={hooks.value} 
                onChange={e => {handleInputChange(e, setting, hooks)}}
                className="slider" 
            />
            <input type="number" value={hooks.value} onChange={e => {handleInputChange(e, setting, hooks)}} />
        </div>
    );
};

const renderInput = (setting, hooks) => {
    return (
        <input 
            type={setting.type}
            value={hooks.value} 
            onChange={e => {handleInputChange(e, setting, hooks)}}
            step={setting.step}
        />
    );
};

const renderOptions = (options) => {
    return options.map(option => {
        return (
            <option value={option.value} key={option.value}>
                {option.label}
            </option>
        );
    });
};

const renderSelect = (setting, hooks) => {
    return (
        <select  
            value={hooks.value}
            onChange={e => {handleInputChange(e, setting, hooks)}} 
        >
            {renderOptions(setting.options)}
        </select>
    );
};

const renderButton = (setting) => {
    //TODO: add button functionality with a custom callback
};


export default ArtSetting;