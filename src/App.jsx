import React, { useState, useEffect } from 'react';

import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import ModalCreateEvent from './components/modalCreateEvent/ModalCreateEvent.jsx';
import ModalDelEvent from './components/modalDelEvent/ModalDelEvent';

import { fetchEvents, createEvent, deleteEvent } from './gateway/events.js';
import {
  getWeekStartDate,
  generateWeekRange,
  getDatePeriodDays,
  getMonthsOnWeek,
  getDateTime,
  getEventObjDate,
  getMinutesWithStep,
  gapMinutes,
  isEventCanDel,
  isOverlapEventsList,
} from '../src/utils/dateUtils.js';

import './styles/common.scss';

export const EventDeleteContext = React.createContext();

const App = () => {
  const [eventsList, setEventsList] = useState([]);

  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));
  const weekDates = generateWeekRange(weekStartDate);

  const [activeModalCreateEvent, setActiveModalCreateEvent] = useState(false);
  const [event, eventChange] = useState(getEventObjDate(new Date()));

  const [activeModalDelEvent, setActiveModalDelEvent] = useState(false);
  const [positionModal, setPositionModal] = useState({ x: 0, y: 0 });
  const [eventId, setEventId] = useState(null);

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
    }
    eventChange({ ...event, [name]: value });
  };

  const handleCreateEvent = () => {
    eventChange(getEventObjDate(new Date()));
    setActiveModalCreateEvent(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { title, date, startTime, endTime, description } = event;

    if (gapMinutes(startTime, endTime) > 360) {
      alert('Sorry, but the scheduled event cannot be longer than 6 hours!');
      return;
    }

    if (gapMinutes(startTime, endTime) < 15) {
      alert('Sorry, but the scheduled event cannot be less than 15 minutes!');
      return;
    }

    if (isOverlapEventsList(date, startTime, endTime, eventsList)) {
      alert(`Sorry, but events can't overlap!`);
      return;
    }

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

  const handleModalDelEvent = e => {
    if (e.target.classList.contains('overlay')) {
      setActiveModalDelEvent(false);
      return;
    }

    if (e.target.closest('.popup__content')) {
      deleteEvent(eventId)
        .then(() => fetchEventsList())
        .catch(error => alert(error));

      setActiveModalDelEvent(false);
    }
  };

  const handleDeleteEvent = e => {
    e.stopPropagation();

    const { clientX, clientY } = e;
    clientX > 155
      ? setPositionModal({ x: clientX - 130, y: clientY - 30 })
      : setPositionModal({ x: clientX + 5, y: clientY - 30 });

    const startTimeDelEvent = e.target.closest('.event').lastChild.innerHTML.split(' - ')[0];
    const dateDelEvent = e.target.closest('.calendar__day').dataset;

    if (isEventCanDel(startTimeDelEvent, dateDelEvent)) {
      alert(`Sorry, you can't delete an event 15 minutes before it starts!`);
      return;
    }

    setEventId(e.target.closest('.event').dataset.id);
    setActiveModalDelEvent(true);
  };

  const handleGetDay = e => {
    const { time } = e.target.closest('.calendar__time-slot').dataset;
    const { day, month } = e.target.closest('.calendar__day').dataset;
    eventChange(getEventObjDate(new Date(2022, month, day, time)));
    setActiveModalCreateEvent(true);
  };

  useEffect(() => {
    fetchEventsList();
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

      <EventDeleteContext.Provider value={handleDeleteEvent}>
        <Calendar weekDates={weekDates} events={eventsList} onGetDay={handleGetDay} />
      </EventDeleteContext.Provider>

      <ModalCreateEvent
        active={activeModalCreateEvent}
        event={event}
        onClose={() => setActiveModalCreateEvent(false)}
        onChange={handleChange}
        onInputData={handleInput}
        onSubmit={handleSubmit}
      />

      <ModalDelEvent
        active={activeModalDelEvent}
        position={positionModal}
        onDelete={handleModalDelEvent}
      />
    </React.Fragment>
  );
};

export default App;
