import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Hour from '../hour/Hour';
import TimeLine from '../timeLine/TimeLine';

import './day.scss';

const Day = ({ dataMonth, dataDay, dayEvents, onGetDay }) => {
  const [currentMinutes, setTime] = useState(new Date().getMinutes());

  const hours = [...Array(24)].map((val, index) => index);
  const currentMonth = new Date().getMonth();
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
    <div className="calendar__day" data-month={dataMonth} data-day={dataDay}>
      {hours.map(hour => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(event => event.dateFrom.getHours() === hour);

        return (
          <React.Fragment key={`h-${dataDay}-${hour}`}>
            {currentMonth === dataMonth && currentDay === dataDay && currentHour === hour && (
              <TimeLine marginTop={currentMinutes} />
            )}
            <Hour dataHour={hour} hourEvents={hourEvents} onGetDay={onGetDay} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Day;

Day.propTypes = {
  dataMonth: PropTypes.number.isRequired,
  dataDay: PropTypes.number.isRequired,
  dayEvents: PropTypes.array.isRequired,
  onGetDay: PropTypes.func.isRequired,
};
