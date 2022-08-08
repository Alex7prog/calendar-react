import React from 'react';
import PropTypes from 'prop-types';

import './modal-create-event.scss';

const ModalCreateEvent = ({ active, event, onClose, onChange, onInputData, onSubmit }) => {
  return (
    <div className={active ? 'overlay overlay_active' : 'overlay'}>
      <div className={active ? 'modal modal_active' : 'modal'}>
        <div className="modal__content">
          <div className="create-event">
            <button className="create-event__close-btn" onClick={onClose}>
              +
            </button>
            <form className="event-form" onSubmit={onSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="event-form__field"
                value={event.title}
                required
                onChange={onChange}
                autoFocus
              />
              <div className="event-form__time">
                <input
                  type="date"
                  name="date"
                  className="event-form__field"
                  value={event.date}
                  onChange={onChange}
                />
                <input
                  type="time"
                  name="startTime"
                  className="event-form__field"
                  step="900"
                  value={event.startTime}
                  required
                  onChange={onChange}
                  onBlur={onInputData}
                />
                <span>-</span>
                <input
                  type="time"
                  name="endTime"
                  className="event-form__field"
                  step="900"
                  value={event.endTime}
                  required
                  onChange={onChange}
                  onBlur={onInputData}
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                className="event-form__field"
                onChange={onChange}
                value={event.description}
              ></textarea>
              <button type="submit" className="event-form__submit-btn">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateEvent;

ModalCreateEvent.propTypes = {
  active: PropTypes.bool,
  event: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onInputData: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

ModalCreateEvent.defaultProps = {
  active: false,
};
