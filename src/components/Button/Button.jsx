import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, hasMore }) => {
  return (
    <div className='ContainerForBTNloadMore'>
      <button type="button" className="Button" onClick={onClick} disabled={!hasMore}>
        {hasMore ? 'Load more' : 'No more images'}
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

export default Button;