import React from 'react';
import './TagChip.scss';

interface TagChipProps {
  tag: string;
}

const TagChip = (props: TagChipProps) => {
  return <div className='tag-chip'>{props.tag}</div>;
};

export default TagChip;
