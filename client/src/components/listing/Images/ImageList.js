import React, { useState } from 'react';

import ImageCard from 'components/listing/Images/ImageCard';
import 'components/listing/Images/ImageList.css';

const ImageList = props => {
  const [active, setActive] = useState(false);
  const setZIndex = () => {
    if (active)
      return {
        zIndex: -5
      };
  };

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
  return (
    <div style={setZIndex()} className="image-list">
      {images}
    </div>
  );
};

export default ImageList;
