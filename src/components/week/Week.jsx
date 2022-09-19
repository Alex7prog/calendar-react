import React from 'react';
import PropTypes from 'prop-types';
import Day from '../day/Day';
import './week.scss';

const Week = ({ weekDates, events, onGetDay }) => {
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);

        //getting all events from the day we will render
        const dayEvents = events.filter(
          event => event.dateFrom >= dayStart && event.dateTo <= dayEnd,
        );

        return (
          <Day
            key={`d-${dayStart.getDay()}-${dayStart.getDate()}`}
            dataMonth={dayStart.getMonth()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            onGetDay={onGetDay}
          />
        );
      })}
    </div>
  );
};

export default Week;

Week.propTypes = {
  weekDates: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  onGetDay: PropTypes.func.isRequired,
};
