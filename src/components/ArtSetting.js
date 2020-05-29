import React from 'react';

import './ArtSetting.css';

class ArtSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.setting.default
        };
    }

    // TODO: attach event listener to the setting to return changes back to the canvas
    render() {
        return (
            this.renderSetting(this.props.setting)
        );
    }

    handleInputChange = (e) => {
        const setting = this.props.property;
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
            default:
                return;
        }

        // trigger a rerender with this inputs newest value
        this.setState({value: newValue});

        // inform the ArtContainer that a setting has been changed
        this.props.handleSettingChange(setting, newValue);

    }

    renderSetting = setting => {
        let input;
        
        switch(setting.type) {
            case 'checkbox':
                input = this.renderCheckbox(setting);
                break;
            case 'slider': 
                input = this.renderSlider(setting);
                break;
            case 'number':
            case 'text':
                input = this.renderInput(setting);
                break;
            default:
                return <p>invalid setting found</p>
        }

        // wrap the input in a label before returning
        return (
            <label className="artwork-setting">
                {setting.label}:
                {input}
            </label>
        );
    };
    
    renderCheckbox = (setting) => {
        return (
            <input 
                type="checkbox" 
                defaultChecked={this.state.value}
                onChange={this.handleInputChange}
            />
        );
    };
    
    renderSlider = (setting) => {

        // don't allow a render with a value exceeding the min/max bounds
        if (this.state.value < setting.bounds.min) {
            this.setState({
                value: setting.bounds.min
            });
            return;
        }
        if (this.state.value > setting.bounds.max) {
            this.setState({
                value: setting.bounds.max
            });
            return;
        } 

        return (
            <input 
                type="range"
                min={setting.bounds.min} 
                max={setting.bounds.max} 
                value={this.state.value} 
                onChange={this.handleInputChange} 
                className="slider" 
            />
        );
    };
    
    renderInput = (setting) => {
        return (
            <input 
                type={setting.type}
                value={this.state.value} 
                onChange={this.handleInputChange}
            />
        );
    };

};

export default ArtSetting;