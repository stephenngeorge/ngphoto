import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({
  message,
  status,
  title,
}) => {
  return (
    <div className={`modal modal--${status}`}>
      {
        title.length > 0 &&
        <h4>{ title }</h4>
      }
      <p>{ message }</p>
    </div>
  );
}

Modal.propTypes = {
  status: PropTypes.string
}

Modal.defaultProps = {
  status: 'info'
}

export default Modal;