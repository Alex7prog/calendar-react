import React, { useState, useEffect } from 'react';

import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import ModalCreateEvent from './components/modalCreateEvent/ModalCreateEvent.jsx';

import { fetchEvents, createEvent } from './gateway/events.js';
import {
  getWeekStartDate,
  generateWeekRange,
  getDatePeriodDays,
  getMonthsOnWeek,
  getDateTime,
  getEventObjDate,
  getMinutesWithStep,
} from '../src/utils/dateUtils.js';
import { isEventValid } from './utils/eventValidation.js';

import './styles/common.scss';

export const FetchEventsListContext = React.createContext();

const App = () => {
  const [eventsList, setEventsList] = useState([]);

  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));
  const weekDates = generateWeekRange(weekStartDate);

  const [activeModalCreateEvent, setActiveModalCreateEvent] = useState(false);
  const [event, eventChange] = useState(getEventObjDate(new Date()));

  const fetchEventsList = () => {
    fetchEvents().then(events => setEventsList(events));
  };

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

  const handleCreateEvent = () => {
    eventChange(getEventObjDate(new Date()));
    setActiveModalCreateEvent(true);
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

    setActiveModalCreateEvent(false);
  };

  const handleGetDay = e => {
    const { time } = e.target.closest('.calendar__time-slot').dataset;
    const { day, month } = e.target.closest('.calendar__day').dataset;
    const dateNewEvent = new Date(2022, month, day, time - 1);

    if (dateNewEvent < new Date()) {
      alert(`Sorry, cannot create an event in the past`);
      return;
    }

    eventChange(getEventObjDate(dateNewEvent));
    setActiveModalCreateEvent(true);
  };

  useEffect(() => {
    fetchEventsList(eventsList);
  }, []);

  return (
    <React.Fragment>
      <Header
        monthTitle={getMonthsOnWeek(weekStartDate)}
        numberEvent={eventsList.length}
        onToday={() => setWeekStartDate(getWeekStartDate(new Date()))}
        onNextWeek={() => setWeekStartDate(getDatePeriodDays(weekStartDate, 7))}
        onPrevWeek={() => setWeekStartDate(getDatePeriodDays(weekStartDate, -7))}
        onCreateEvent={handleCreateEvent}
      />
      <FetchEventsListContext.Provider value={{ fetchEventsList, eventsList }}>
        <Calendar weekDates={weekDates} events={eventsList} onGetDay={handleGetDay} />
      </FetchEventsListContext.Provider>

      <ModalCreateEvent
        active={activeModalCreateEvent}
        event={event}
        onClose={() => setActiveModalCreateEvent(false)}
        onChange={handleChange}
        onInputData={handleInput}
        onSubmit={handleSubmit}
      />
    </React.Fragment>
  );
};

export default App;
