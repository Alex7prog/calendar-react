import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { EventDeleteContext } from '../../App';

import './event.scss';

const Event = ({ eventId, height, marginTop, title, time }) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const eventDelete = useContext(EventDeleteContext);

  return (
    <div style={eventStyle} className="event" data-id={eventId} onClick={eventDelete}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
    </div>
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
