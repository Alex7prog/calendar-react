import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { FetchEventsListContext } from '../../App';

import { createEvent } from '../../gateway/events';
import { getDateTime, getMinutesWithStep } from '../../utils/dateUtils';
import { isEventValid } from '../../utils/eventValidation';

import './modal-create-event.scss';

const ModalCreateEvent = ({ event, activeModal, setActiveModal, eventChange }) => {
  const { fetchEventsList, eventsList } = useContext(FetchEventsListContext);

  const handleChange = e => {
    const { name, value } = e.target;
    eventChange({ ...event, [name]: value });
  };

  const handleInput = e => {
    let { name, value } = e.target;

    if (name === 'startTime' || name === 'endTime') {
      value = getMinutesWithStep(value, 15);
      eventChange({ ...event, [name]: value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!isEventValid(event, eventsList)) {
      return;
    }

    const { title, date, startTime, endTime, description } = event;

    createEvent({
      title,
      description,
      dateFrom: getDateTime(date, startTime),
      dateTo: getDateTime(date, endTime),
    })
      .catch(error => alert(error))
      .then(() => fetchEventsList());

    setActiveModal(false);
  };

  return (
    <div className={activeModal ? 'overlay overlay_active' : 'overlay'}>
      <div className={activeModal ? 'modal modal_active' : 'modal'}>
        <div className="modal__content">
          <div className="create-event">
            <button className="create-event__close-btn" onClick={() => setActiveModal(false)}>
              +
            </button>
            <form className="event-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="event-form__field"
                value={event.title}
                required
                onChange={handleChange}
                autoFocus
              />
              <div className="event-form__time">
                <input
                  type="date"
                  name="date"
                  className="event-form__field"
                  value={event.date}
                  onChange={handleChange}
                />
                <input
                  type="time"
                  name="startTime"
                  className="event-form__field"
                  step="900"
                  value={event.startTime}
                  required
                  onChange={handleChange}
                  onBlur={handleInput}
                />
                <span>-</span>
                <input
                  type="time"
                  name="endTime"
                  className="event-form__field"
                  step="900"
                  value={event.endTime}
                  required
                  onChange={handleChange}
                  onBlur={handleInput}
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                className="event-form__field"
                onChange={handleChange}
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
  activeModal: PropTypes.bool,
  event: PropTypes.object.isRequired,
  setActiveModal: PropTypes.func.isRequired,
  eventChange: PropTypes.func.isRequired,
};

ModalCreateEvent.defaultProps = {
  active: false,
};
