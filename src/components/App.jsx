import React, { Component, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import './styles/styles.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');


  const handleSearchSubmit = query => {
    setSearchQuery( query);
    setPage( 1 );
  };

   const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = imageUrl => {
   setShowModal( true);
   setModalImageUrl( imageUrl);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImageUrl('');
  };

    return (
      <div className='App'>
        <Searchbar onSubmit={ handleSearchSubmit} />
        {searchQuery && (
          <ImageGallery
            query={searchQuery}
            page={page}
            perPage={perPage}
            onLoadMore={handleLoadMore}
            onOpenModal={handleOpenModal}
          />
        )}
        {showModal && <Modal imageUrl={modalImageUrl} onCloseModal={handleCloseModal} />}
      </div>
    );
  }


export default App;
