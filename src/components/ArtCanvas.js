import React from 'react';


import artworkList from './artwork/artwork-list.json';

// PureComponent helps to prevent unnecessary renders using a shallow props check
class ArtCanvas extends React.PureComponent {

    constructor(props) {
        super(props);

        // get the requested artwork name from the url
        this.state = {
            title: props.name,
            descripton: "",
            filename: "",
            dimensional: props.dimensional, // typically "2d" or "3d"
            dimension: {
                width: props.width || Math.min(window.innerWidth*0.9, 800),
                height: props.height || Math.min(window.innerWidth*0.9, 800)
            },
            scriptPath: '/artwork/',
            activeArtModule: null
        };
    }

    renderCanvas() {
        // only create a canvas when a matching artwork is found at this url
        if (!this.state.filename) {
            return <h2>Invalid artwork selected.</h2>;
        }

        
        if (!this.state.activeArtModule) {
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

        // check that the provided dimensional setting is valid
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
            this.state.activeArtModule(canvasCtx, this.state.dimension.width, this.state.dimension.height, this.props.addSettings, this.props.settingValues, this.props.seed);
        }

    }

    loadArtComponent = async (filepath) => {
        // dynamically import the instruction for this artwork to render
        const artComponent = await import(`.${filepath}`);
        this.setState({
            activeArtModule: artComponent.default
        });

        return;
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

export default ArtCanvas;