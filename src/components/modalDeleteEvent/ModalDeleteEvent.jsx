import React from 'react';
import PropTypes from 'prop-types';
import './modal-delete-event.scss';

const ModalDeleteEvent = ({ active, onDelete, setActive, position }) => {
  return (
    <div
      className={active ? 'popup-overlay popup-overlay_active' : 'popup-overlay'}
      onClick={e => {
        e.stopPropagation(e);
        setActive(false);
      }}
    >
      <div
        className={active ? 'popup popup_active' : 'popup'}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      >
        <div className="popup__content" onClick={onDelete}>
          <i className="fas fa-trash"></i>
          <span>Delete</span>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteEvent;

ModalDeleteEvent.propTypes = {
  active: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  position: PropTypes.object.isRequired,
};

ModalDeleteEvent.defaultProps = {
  active: false,
};
