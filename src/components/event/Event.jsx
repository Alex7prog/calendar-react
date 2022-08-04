import React from 'react';
import events from '../../gateway/events';

import './event.scss';

const Event = ({ eventId, height, marginTop, title, time, onEventDelete }) => {
  const eventStyle = {
    height,
    marginTop,
  };

  return (
    <div style={eventStyle} className="event" data-id={eventId} onClick={onEventDelete}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
    </div>
  );
};

export default Event;
