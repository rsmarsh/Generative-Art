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
                onChange={e => this.setState({value: e.target.checked})}
            />
        );
    };
    
    renderSlider = (setting) => {
        return (
            <input 
                type="range"
                min={setting.bounds.min} 
                max={setting.bounds.max} 
                value={this.state.value} 
                onChange={e => this.setState({value: e.target.value})} 
                className="slider" 
            />
        );
    };
    
    renderInput = (setting) => {
        return (
            <input 
                type={setting.type}
                value={this.state.value} 
                onChange={e => this.setState({value: e.target.value})}
            />
        );
    };

    handleChange = (event) => {

    };
};

export default ArtSetting;