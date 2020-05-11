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

    renderTiles() {
        return artworkList.twoDimensional.map(artwork => {
            return <ArtTile title={artwork.title} description={artwork.description} path={artwork.path} key={artwork.title} />;
        });
    }
    
    render() {
        return (
            this.renderTiles()
        )
    }
}

export default ArtList;