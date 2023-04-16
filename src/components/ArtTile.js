import React from 'react';
import { Link } from 'react-router-dom';
import './ArtTile.scss';

const ArtTile = (props) => {
  return (
    <Link className='art-link' to={props.path}>
      <div className='art-tile'>
        <div className='preview'>
          <img src={props.image} alt={props.title} />
        </div>
        <div className='description'>
          <strong>{props.title}</strong>

          <p>{props.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArtTile;
