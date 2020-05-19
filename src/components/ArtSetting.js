import React from 'react';

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

        switch(setting.type) {
            case 'checkbox':
                return this.renderCheckbox(setting);
            case 'slider': 
                return this.renderSlider(setting);
            case 'number':
            case 'text':
                return this.renderInput(setting);
            default:
                return <p>invalid setting found</p>
        }
    };
    
    renderCheckbox = (setting) => {
        return (
            <label>
                {setting.label}:
                <input 
                    type="checkbox" 
                    defaultChecked={this.state.value}
                    onChange={e => this.setState({value: e.target.checked})}
                />
            </label>
        );
    };
    
    renderSlider = (setting) => {
        return (
            <label>
                {setting.label}:
                <input 
                    type="range"
                    min={setting.bounds.min} 
                    max={setting.bounds.max} 
                    value={this.state.value} 
                    onChange={e => this.setState({value: e.target.value})} 
                    className="slider" 
                />
            </label>
        );
    };
    
    renderInput = (setting) => {
        return (
            <label>
                {setting.label}:
                <input 
                    type={setting.type}
                    value={this.state.value} 
                    onChange={e => this.setState({value: e.target.value})}
                />
            </label>
        );
    };

    handleChange = (event) => {

    };
};

export default ArtSetting;