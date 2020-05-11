import React from 'react';

class ArtTile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getPath() {

    }

    render() {

        return (
            <a href={ this.props.path }>
                <div>
                    <strong>
                        { this.props.title }
                    </strong>
                    <p>
                        { this.props.description }
                    </p>
                </div>
            </a>
        )
    }
}   

export default ArtTile;