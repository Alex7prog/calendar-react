import React, { useState, useEffect } from 'react';

import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import ModalCreateEvent from './components/modalCreateEvent/ModalCreateEvent.jsx';

import { fetchEvents } from './gateway/events.js';
import {
  getWeekStartDate,
  generateWeekRange,
  getDatePeriodDays,
  getMonthsOnWeek,
  getObjectEventWithDate,
  getObjectEvent,
} from '../src/utils/dateUtils.js';
import { isEventValid } from './utils/eventValidation.js';

import './styles/common.scss';

export const FetchEventsListContext = React.createContext();

const App = () => {
  const [eventsList, setEventsList] = useState([]);

  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));
  const weekDates = generateWeekRange(weekStartDate);

  const [activeModalCreateEvent, setActiveModalCreateEvent] = useState(false);
  const [event, eventChange] = useState(getObjectEventWithDate(new Date()));

  const fetchEventsList = () => {
    fetchEvents().then(events => setEventsList(events));
  };

  const handleCreateEvent = e => {
    const newEvent = getObjectEvent(e);

    if (!isEventValid(newEvent, eventsList)) {
      return;
    }

    eventChange(newEvent);
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
      <FetchEventsListContext.Provider value={{ fetchEventsList, eventsList }}>
        <Calendar weekDates={weekDates} events={eventsList} onGetDay={handleCreateEvent} />

        {activeModalCreateEvent && (
          <ModalCreateEvent
            event={event}
            activeModal={activeModalCreateEvent}
            setActiveModal={setActiveModalCreateEvent}
            eventChange={eventChange}
          />
        )}
      </FetchEventsListContext.Provider>
    </React.Fragment>
  );
};

export default App;
