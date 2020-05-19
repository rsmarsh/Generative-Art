import React from 'react';
import ArtCanvas from './ArtCanvas';
import { withRouter } from 'react-router-dom';

class ArtContainer extends React.Component {

    render() {
        
        return (
                <ArtCanvas name={this.props.match.params.name} dimensional={this.props.match.params.dimensional} addSettings={this.addSettings} />
        )
    }
}

export default withRouter(ArtContainer); 