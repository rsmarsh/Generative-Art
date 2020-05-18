import React from 'react';
import { withRouter } from 'react-router-dom';

import artworkList from './artwork/artwork-list.json';

class ArtCanvas extends React.Component {

    constructor(props) {
        super(props);

        // get the requested artwork name from the url
        this.state = {
            title: props.match.params.name,
            descripton: "",
            filename: "",
            dimensional: props.match.params.dimensional, // typically "2d" or "3d"
            dimension: {
                width: props.width || 800,
                height: props.height || 800
            },
            scriptPath: '/artwork/',
            activeArtModule: null
        }
    }
    
    renderCanvas() {
        // only create a canvas when a matching artwork is found at this url
        if (!this.state.filename) {
            return <h2>Invalid artwork selected.</h2>;
        }

        
        if (!this.state.activeArtModule) {
            // TODO: look into race conditions with doing this right before the canvas is returned/rendered
            // this.loadExternalScript(this.state.scriptPath + this.state.filename);
            this.loadArtComponent(this.state.scriptPath + this.state.filename);
            return <h2>Loading canvas...</h2>;
        }
        this.canvasRef = <canvas ref="artcanvas" width={this.state.dimension.width} height={this.state.dimension.height} />
        return this.canvasRef;
    }

    retrieveArtworkData(title) {
        let dimensional;
        if (this.state.dimensional === '2d') {
            dimensional = 'twoDimensional';
        } else if (this.state.dimensional === '3d') {
            dimensional = 'threeDimensional';
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
    
    componentDidUpdate() {
        if (this.state.activeArtModule) {
            const canvasCtx = this.refs.artcanvas.getContext('2d'); 
            this.state.activeArtModule(canvasCtx, this.state.dimension.width, this.state.dimension.height);
        }

    }

    loadArtComponent = async (filepath) => {
        // dynamically import the instruction for this artwork to render
        const artComponent = await import(`.${filepath}`);

        this.setState({
            activeArtModule: artComponent.default
        });
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