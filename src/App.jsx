import React, { useState, useEffect } from 'react';

import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
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
} from '../src/utils/dateUtils.js';

import './common.scss';

export const EventDeleteContext = React.createContext();

const App = () => {
  const [eventsList, setEventsList] = useState([]);

  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));
  const weekDates = generateWeekRange(weekStartDate);

  const [activeModalCreateEvent, setActiveModalCreateEvent] = useState(false);
  const [event, eventChange] = useState(getEventObjDate(new Date()));

  const [showModalDelEvent, setShowModalDelEvent] = useState(false);
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
    console.log('handleInput: ', handleInput);
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
    console.log('date: ', date);
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
      setShowModalDelEvent(false);
      return;
    }

    if (e.target.closest('.popup__content')) {
      deleteEvent(eventId)
        .then(() => fetchEventsList())
        .catch(error => alert(error));

      setShowModalDelEvent(false);
    }
  };

  const handleDeleteEvent = e => {
    e.stopPropagation();

    const { clientX, clientY } = e;
    clientX > 155
      ? setPositionModal({ x: clientX - 130, y: clientY - 30 })
      : setPositionModal({ x: clientX + 5, y: clientY - 30 });

    setEventId(e.target.closest('.event').dataset.id);
    setShowModalDelEvent(true);
  };

  const handleGetDay = e => {
    const { time } = e.target.closest('.calendar__time-slot').dataset;
    const { day, month } = e.target.closest('.calendar__day').dataset;
    eventChange(getEventObjDate(new Date(2022, month, day, time)));
    setActiveModalCreateEvent(true);
  };

  useEffect(() => {
    console.log(111);
    fetchEventsList();
  }, []);

  console.log('App');
  // console.log(eventsList.length);
  // console.log(showModalCreateEvent);
  // console.log(showModalCreateEvent.date);
  // console.log('event.dateFrom>>>', event.dateFrom);
  // console.log(showModalDelEvent);
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
        <Calendar
          weekDates={weekDates}
          events={eventsList}
          // onGetDay={() => setActiveModalCreateEvent(true)}
          onGetDay={handleGetDay}
        />
      </EventDeleteContext.Provider>

      {/* {activeModalCreateEvent && ( */}
      <Modal
        active={activeModalCreateEvent}
        date={event}
        setActive={setActiveModalCreateEvent}
        onClose={() => setActiveModalCreateEvent(false)}
        onChange={handleChange}
        onInputData={handleInput}
        onSubmit={handleSubmit}
      />
      {/* )} */}

      {/* {showModalDelEvent && ( */}
      <ModalDelEvent
        active={showModalDelEvent}
        position={positionModal}
        onDelete={handleModalDelEvent}
      />
      {/* )} */}
    </React.Fragment>
  );
};

export default App;
