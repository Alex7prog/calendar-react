import React from 'react';

import { days } from '../../utils/dateUtils.js';

const Navigation = ({ weekDates }) => {
  const currentDay = new Date();
  return (
    <header className="calendar__header">
      {weekDates.map(dayDate => (
        <div className="calendar__day-label day-label">
          {currentDay.toDateString() === dayDate.toDateString() ? (
            <>
              <span className="day-label__day-name day-label__day-name_current">
                {days[dayDate.getDay()]}
              </span>
              <span className="day-label__day-number day-label__day-number_current">
                {dayDate.getDate()}
              </span>
            </>
          ) : (
            <>
              <span className="day-label__day-name">{days[dayDate.getDay()]}</span>
              <span className="day-label__day-number">{dayDate.getDate()}</span>
            </>
          )}
        </div>
      ))}
    </header>
  );
};

export default Navigation;
