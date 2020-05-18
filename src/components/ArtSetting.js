import React from 'react';

const renderSetting = setting => {
    switch(setting.type) {
        case 'checkbox':
            return renderCheckbox(setting);
        case 'slider': 
            return renderSlider(setting);
        case 'input':
            return renderInput(setting);
    }
};

const renderCheckbox = (setting) => {
    return <input type="checkbox" checked={setting.checked} />;
};

const renderSlider = (setting) => {
    // TODO: add slider support
};

const renderInput = (setting) => {
    return <input type="text" placeholder={setting.default} />;
};

const ArtSetting = props => {
    // TODO: attach event listener to the setting to return changes back to the canvas
    return (
        renderSetting(props.setting)
    );
};

export default ArtSetting;