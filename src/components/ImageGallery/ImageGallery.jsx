import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

const ImageGallery = ({ query, perPage, onOpenModal }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setImages([]);
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    const fetchImages = async () => {
      const apiKey = '37446225-ced4f53dd81a7d760f8a029fd';
      const url = `https://pixabay.com/api/?q=${query}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

      setIsLoading(true);

      try {
        const response = await axios.get(url);
        const newImages = response.data.hits.map(image => ({
          ...image,
          id: image.id,
        }));

        setImages(prevImages => [...prevImages, ...newImages]);
        setTotalImages(response.data.total);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, currentPage, perPage]);

  return (
    <div>
      <ul className="ImageGallery">
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} onOpenModal={onOpenModal} />
        ))}
      </ul>
      {isLoading && <Loader />}
      {images.length < totalImages && (
        <Button onClick={() => setCurrentPage(prevPage => prevPage + 1)} hasMore={!isLoading} />
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  perPage: PropTypes.number.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;