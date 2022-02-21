import React from 'react';
import ArtTile from 'Components/ArtTile';
import './ArtList.scss';
import artworkList from 'Components/artwork/artwork-list.json';

const imagePath = 'art-images/';

const getFilepath = (dimensional, name) => {
  if (dimensional === '2d') {
    return `/art/${dimensional}/${name}`;
  }

  if (dimensional === '3d') {
    return `art/${dimensional}/${name}`;
  }
};

const renderTiles = () => {
  return (
    <div>
      <div className='art-category'>
        <h2>2D</h2>

        {artworkList.twoDimensional.map((artwork) => (
          <ArtTile
            title={artwork.title}
            description={artwork.description}
            path={getFilepath('2d', artwork.title)}
            image={imagePath + artwork.image}
            key={artwork.title}
          />
        ))}
      </div>

      <div className='art-category'>
        <h2>3D</h2>

        {artworkList.threeDimensional.map((artwork) => (
          <ArtTile
            title={artwork.title}
            description={artwork.description}
            path={getFilepath('3d', artwork.title)}
            image={imagePath + artwork.image}
            key={artwork.title}
          />
        ))}

      </div>
    </div>
  );
};

const ArtList = () => {
  return <div>{renderTiles()}</div>;
};

export default ArtList;
