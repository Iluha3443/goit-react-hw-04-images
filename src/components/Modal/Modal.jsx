import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { imageUrl } = this.props;

    return (
      <div className="Overlay" onClick={this.handleClick}>
        <div className="Modal">
          <img src={imageUrl} alt="" />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;