import React from 'react';
import PropTypes from 'prop-types';
import './modal-del-event.scss';

const ModalDelEvent = ({ active, onDelete, position }) => {
  // const popupElem = document.querySelector('.popup');
  // if (popupElem) {
  //   popupElem.style.left = `${position.x}px`;
  //   popupElem.style.top = `${position.y}px`;
  // }

  return (
    <div className={active ? 'overlay overlay_active' : 'overlay'} onClick={onDelete}>
      <div
        className={active ? 'popup popup_active' : 'popup'}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      >
        <div className="popup__content">
          <i className="fas fa-trash"></i>
          <span>Delete</span>
        </div>
      </div>
    </div>
  );
};

export default ModalDelEvent;

ModalDelEvent.propTypes = {
  active: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  position: PropTypes.object.isRequired,
};

ModalDelEvent.defaultProps = {
  active: false,
};
