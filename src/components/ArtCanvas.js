import React from 'react';
import { withRouter } from 'react-router-dom';

import artworkList from '../artwork/artwork-list.json';

class ArtCanvas extends React.Component {
    // get the requested artwork name from the url
    state = {
        title: this.props.match.params.name,
        descripton: "",
        filename: "",
        dimensional: this.props.match.params.dimensional, // typically "2d" or "3d"
        dimension: {
            width: this.props.width || 800,
            height: this.props.height || 800
        },
        scriptPath: '/artwork/'
    }


    renderCanvas() {
        // only create a canvas when a matching artwork is found at this url
        if (!this.state.filename) {
            return <h2>Invalid artwork selected.</h2>;
        }

        // TODO: look into race conditions with doing this right before the canvas is returned/rendered
        this.loadExternalScript(this.state.scriptPath + this.state.filename);

        return <canvas width={this.state.width} height={this.state.height} />
    }

    retrieveArtworkData(title) {
        let dimensional;
        if (this.state.dimensional === '2d') {
            dimensional = "twoDimensional";
        } else if (this.state.dimensional === '3d') {
            dimensional = "threeDimensional";
        }
        
        let artworkArray = artworkList[dimensional];

        if (Array.isArray(artworkArray)) {
            return artworkArray.find(art => art.title === title);
        }

        return false;
    }

    // initialise loading of external JS script
    componentDidMount() {   

        const artwork = this.retrieveArtworkData(this.state.title);
        if (!artwork) {
            return;
        }

        this.setState({...artwork}); 
        
    }

    loadExternalScript(filepath) {
        const script = document.createElement("script");
        script.async = true;
        script.src = filepath;
        this.canvasDiv.appendChild(script);
    }

    render() {
        return (
            // store a reference to this div within the class, to append the external script to
            <div ref={el => (this.canvasDiv = el)}>
                <h2>
                    { this.state.title }
                </h2>
                { this.renderCanvas() }
            </div>
        );
    }
}

export default withRouter(ArtCanvas);