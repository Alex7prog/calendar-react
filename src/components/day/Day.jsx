import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Hour from '../hour/Hour';
import TimeLine from '../timeLine/TimeLine';

import './day.scss';

const Day = ({ dataMonth, dataDay, dayEvents, onGetDay }) => {
  const hours = [...Array(24)].map((val, index) => index);
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();

  return (
    <div className="calendar__day" data-month={dataMonth} data-day={dataDay}>
      {currentMonth === dataMonth && currentDay === dataDay && <TimeLine />}

      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => event.dateFrom.getHours() === hour);

        return (
          <React.Fragment key={`h-${dataDay}-${hour}`}>
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
