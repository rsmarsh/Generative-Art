import React from 'react';
import ArtTile from './ArtTile';

import artworkList from '../artwork/artwork-list.json';



class ArtList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artworkList: artworkList
        }

    }

    componentDidMount() {

    }

    getFilepath(dimensional, name) {
        if (dimensional === "2d") {
            return `/art/${dimensional}/${name}`;
        }

        if (dimensional === "3d") {
            //TODO: add 3d support
        }
    }

    renderTiles() {
        return artworkList.twoDimensional.map(artwork => {
            return <ArtTile title={artwork.title} description={artwork.description} path={this.getFilepath('2d', artwork.title)} key={artwork.title} />;
        });
    }
    
    render() {
        return (
            this.renderTiles()
        )
    }
}

export default ArtList;