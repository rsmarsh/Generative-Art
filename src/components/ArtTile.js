import React from 'react';
import { Link } from 'react-router-dom';
import TagChip from './TagChip';
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
          <ul className='tag-list'>
            {props.tags && props.tags.map((tag) => <TagChip key={tag} tag={tag} />)}
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default ArtTile;
