import './ImageList.css';
import React, { useState } from 'react';
import ImageCard from './ImageCard';

const ImageList = props => {
  const [active, setActive] = useState(false);
  const images = props.images.map(image => {
    return (
      <ImageCard
        setActive={setActive}
        active={active}
        image={image}
        key={image.original}
      />
    );
  });
  return <div className="image-list">{images}</div>;
};

export default ImageList;
