import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ imageUrl, onCloseModal }) => {
  const handleKeyPress = useCallback(event => {
    if (event.code === 'Escape') {
      onCloseModal();
    }
  }, [onCloseModal]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleClick = event => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <div className="Overlay" onClick={handleClick}>
      <div className="Modal">
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;