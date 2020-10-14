import React from 'react';
import PropTypes from 'prop-types';

import './_modal.scss';

const Modal = ({
  handleClose,
  message,
  status,
  title,
}) => {
  return (
    <div className={`modal modal--${status} text-container--very-narrow`}>
      {
        title.length > 0 &&
        <h4>{ title }</h4>
      }
      <p>{ message }</p>
      <button onClick={handleClose}>
        <div className="modal__close-btn modal__close-btn--h"></div>
        <div className="modal__close-btn modal__close-btn--v"></div>
      </button>
    </div>
  );
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.string,
  title: PropTypes.string,
}

Modal.defaultProps = {
  status: 'info'
}

export default Modal;