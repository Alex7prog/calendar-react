import React, { useState, useEffect } from 'react';
import Hour from '../hour/Hour';
import TimeLine from '../timeLine/TimeLine';

import './day.scss';

const Day = ({ dataDay, dayEvents, onEventDelete }) => {
  const hours = [...Array(24)].map((val, index) => index);

  const [currentMinutes, setTime] = useState(new Date().getMinutes());

  const currentDay = new Date().getDate();
  const currentHour = new Date().getHours();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().getMinutes());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map(hour => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(event => event.dateFrom.getHours() === hour);

        return (
          <>
            {currentDay === dataDay && currentHour === hour && (
              <TimeLine marginTop={currentMinutes} />
            )}
            <Hour
              key={dataDay + hour}
              dataHour={hour}
              hourEvents={hourEvents}
              onEventDelete={onEventDelete}
            />
          </>
        );
      })}
    </div>
  );
};

export default Day;
