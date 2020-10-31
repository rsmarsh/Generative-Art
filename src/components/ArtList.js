import React from 'react';
import ArtTile from './ArtTile';

import artworkList from './artwork/artwork-list.json';

const getFilepath = (dimensional, name) => {
    if (dimensional === "2d") {
        return `/art/${dimensional}/${name}`;
    }
    
    if (dimensional === "3d") {
        //TODO: add 3d support
    }
}

const renderTiles = () => {
    return artworkList.twoDimensional.map(artwork => {
        return <ArtTile title={artwork.title} description={artwork.description} path={getFilepath('2d', artwork.title)} key={artwork.title} />;
    });
}

const ArtList = () => {
    return (
        <div>
            {renderTiles()}
        </div>
    );
    
}

export default ArtList;