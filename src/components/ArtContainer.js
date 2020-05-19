import React from 'react';
import ArtCanvas from './ArtCanvas';
import ArtSetting from './ArtSetting';
import { withRouter } from 'react-router-dom';

class ArtContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            settingList: []
        };
    }

    // return a list of settings available for the currently open artwork 
    renderSettings() {
        return this.state.settingList.map(setting => <ArtSetting key={setting.property} setting={setting} />)
    }

    // this function is passed to the canvas as a callback for each individual artwork to use if required
    addSettings = (setting) => {
        let settingArray = [...this.state.settingList]; // use spread to prevent modifying the state's array directly

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
                <ArtCanvas name={this.props.match.params.name} dimensional={this.props.match.params.dimensional} addSettings={this.addSettings} />
                {this.renderSettings()}
            </div>

        )
    }
}

export default withRouter(ArtContainer); 