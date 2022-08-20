import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { FetchEventsListContext } from '../../App';
import ModalDeleteEvent from '../modalDeleteEvent/ModalDeleteEvent';
import { canDeleteEvent } from '../../utils/dateUtils';
import { deleteEvent } from '../../gateway/events';
import './event.scss';

const Event = ({ eventId, height, marginTop, title, time }) => {
  const [activePopup, setActivePopup] = useState(false);
  const [positionModal, setPositionModal] = useState({ x: 0, y: 0 });
  const [eventIdState, setEventId] = useState(null);
  const eventStyle = {
    height,
    marginTop,
  };

  const { fetchEventsList, eventsList } = useContext(FetchEventsListContext);

  const handleModalDeleteEvent = e => {
    deleteEvent(eventIdState)
      .then(() => fetchEventsList())
      .catch(error => alert(error));
  };

  const handleDeleteEvent = e => {
    e.stopPropagation();

    const { clientX, clientY } = e;
    clientX > 155
      ? setPositionModal({ x: clientX - 130, y: clientY - 30 })
      : setPositionModal({ x: clientX + 5, y: clientY - 30 });

    const targetEventId = e.target.closest('.event').dataset.id;
    const targetEvent = eventsList.find(event => event.id === targetEventId);

    if (canDeleteEvent(targetEvent.dateFrom)) {
      alert(`Sorry, you can't delete an event 15 minutes before it starts!`);
      return;
    }

    setEventId(targetEventId);

    setActivePopup(true);
  };

  return (
    <>
      <div style={eventStyle} className="event" data-id={eventId} onClick={handleDeleteEvent}>
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
      </div>
      <ModalDeleteEvent
        active={activePopup}
        position={positionModal}
        setActive={setActivePopup}
        onDelete={handleModalDeleteEvent}
      />
    </>
  );
};

export default Event;

Event.propTypes = {
  eventId: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};
