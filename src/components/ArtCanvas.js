import React from 'react';
import { withRouter } from 'react-router-dom';

class ArtCanvas extends React.Component {
    // get the requested artwork name from the url
    state = {
        name: this.props.match.params.name,
        dimension: {
            width: this.props.width || 800,
            height: this.props.height || 800
        },
        scriptPath: '/src/artwork/scripts/'
    }


    renderCanvas() {
        return <canvas width={this.state.width} height={this.state.height} />
    }

    // initialise loading of external JS script
    componentDidMount() {        
        this.loadExternalScript(this.state.scriptPath + this.state.name + '.js') 
    }

    loadExternalScript(filepath) {
        console.log(filepath);
        const script = document.createElement("script");
        script.async = true;
        script.src = filepath;
        this.canvasDiv.appendChild(script);
    }

    render() {
        console.log(this.props)
        return (
            // store a reference to this div within the class, to append the externam script to
            <div ref={el => (this.canvasDiv = el)}>
                <h2>
                    { this.state.name }
                </h2>
                { this.renderCanvas() }
            </div>
        );
    }
}

export default withRouter(ArtCanvas);