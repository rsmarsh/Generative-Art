import React from 'react';
import ArtCanvas from './ArtCanvas';
import ArtSetting from './ArtSetting';
import { withRouter } from 'react-router-dom';

class ArtContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            settingList: [],
            settingValues: {}, // as custom changes are made using the settings, this object is populated
            seed: props.seed
        };
    }

    // return a list of settings available for the currently open artwork 
    renderSettings() {
        return this.state.settingList.map(setting => 
            <ArtSetting 
                key={setting.property} 
                property={setting.property} 
                setting={setting} 
                handleSettingChange={this.handleSettingChange}
            />
        );
    }

    // passed to each setting as a callback. this allows the input to inform the canvas each time a setting is changed
    handleSettingChange = (setting, value) => {
        
        let settingValues = {...this.state.settingValues, [setting]: value};
        this.setState({
            settingValues
        });
    }

    // this function is passed to the canvas as a callback for each individual artwork to use if required
    addSettings = (setting) => {
        let settingArray = []; // use spread to prevent modifying the state's array directly

        // allow for both single settings, and an array of settings to be passed into this function
        if (Array.isArray(setting)) {
            setting.forEach(setting => {
                settingArray.push(setting)
            });
        } else {
            settingArray.push(setting);
        }

        this.setState({
            settingList: settingArray
        });

    }
    

    render() {
        
        return (
            <div>
                <ArtCanvas 
                    name={this.props.match.params.name} 
                    dimensional={this.props.match.params.dimensional} 
                    addSettings={this.addSettings}
                    settingValues={this.state.settingValues}
                    seed={this.props.seed}
                />
                {this.renderSettings()}
            </div>

        );
    }
}

export default withRouter(ArtContainer); 