import React, { useContext } from 'react';
import events from '../../gateway/events';
// import { EventDeleteContext } from '../calendar/Calendar';
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
