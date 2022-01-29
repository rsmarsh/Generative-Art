import React from 'react';
import './ArtTile.scss';

const ArtTile = (props) => {
  return (
    <a className='art-link' href={props.path}>
      <div className='art-tile'>
        <div className='preview'>
          <img src={props.image} alt={props.title} />
        </div>
        <div className='description'>
          <strong>{props.title}</strong>

          <p>{props.description}</p>
        </div>
      </div>
    </a>
  );
};

export default ArtTile;
