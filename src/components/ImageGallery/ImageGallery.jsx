import React, { useState,useEffect } from 'react';

import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images,  onOpenModal }) => {
 

  // const handleScroll = () => {
  //   if (!isLoading && images.length < totalImages) {
  //     const { innerHeight } = window;
  //     const { scrollHeight, scrollTop } = document.documentElement;
  //     const scrolledToBottom = innerHeight + scrollTop >= scrollHeight;

  //     if (scrolledToBottom) {
  //       fetchImages();
  //     }
  //   }
  // };

  
  
  // const addScrollListener = () => {
  //   window.addEventListener('load', handleScroll);
  // };

  // const removeScrollListener = () => {
  //   window.removeEventListener('load', handleScroll);
  // };

  return (
       <ul className="ImageGallery">
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} onOpenModal={onOpenModal} />
        ))}
        </ul>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
