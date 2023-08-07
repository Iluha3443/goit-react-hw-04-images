import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import './styles/styles.css';
import axios from 'axios';
import Loader from './Loader/Loader'
import Button from './Button/Button';
import { nanoid } from 'nanoid';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
    setImages([])
    setIsLoading(false)
    setCurrentPage(1)
    fetchImages();
  }, [searchQuery]);
  
  const handleSearchSubmit = query => {
    setSearchQuery( query);
  };

  //  const handleLoadMore = () => {
  //   setPage(prevPage => prevPage + 1);
  // };

  const handleOpenModal = imageUrl => {
   setShowModal( true);
   setModalImageUrl( imageUrl);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImageUrl('');
  };

  const fetchImages = () => {
    const apiKey = '37446225-ced4f53dd81a7d760f8a029fd';
    const url = `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
    setIsLoading(true);

    axios
      .get(url)
      .then(response => {
        const newImages = response.data.hits.map(image => ({
          ...image,
          id: nanoid(),
        }));
        setImages(prevState => [...prevState, ...newImages])
        setIsLoading(false)
        setTotalImages(response.data.total)
        setCurrentPage(1)
        setCurrentPage(prevState => prevState + 1)
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        setIsLoading(false)
      });
  };
    return (
      <div className='App'>
        <Searchbar onSubmit={ handleSearchSubmit} />
        {searchQuery && (
          <ImageGallery
            images={images}
            onOpenModal={handleOpenModal}
          />
        )}
         {isLoading && <Loader />}
      {images.length > 0 && images.length < totalImages && (
        <Button onClick={fetchImages} hasMore={!isLoading} />
      )}
        {showModal && <Modal imageUrl={modalImageUrl} onCloseModal={handleCloseModal} />}
      </div>
    );
  }


export default App;
