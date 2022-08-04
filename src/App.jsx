import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import {
  getWeekStartDate,
  generateWeekRange,
  getDatePeriodDays,
  getMonthsOnWeek,
  getDateTime,
} from '../src/utils/dateUtils.js';
import events from './gateway/events.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [showModalCreateEvent, setShowModalCreateEvent] = useState(false);
  const [event, eventChange] = useState({
    // id: null,
    // title: null,
    // description: null,
    // dateFrom: null,
    // dateTo: null,
  });

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const handleChange = e => {
    const { name, value } = e.target;
    eventChange({ ...event, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { title, date, startTime, endTime, description } = event;
    events.push({
      id: Math.random(),
      title,
      description,
      dateFrom: getDateTime(date, startTime),
      dateTo: getDateTime(date, endTime),
    });
    setShowModalCreateEvent(false);
  };

  // console.log(event);
  // console.log(events);

  return (
    <>
      <Header
        monthTitle={getMonthsOnWeek(weekStartDate)}
        onToday={() => setWeekStartDate(new Date())}
        onNextWeek={() => setWeekStartDate(getDatePeriodDays(weekStartDate, 7))}
        onPrevWeek={() => setWeekStartDate(getDatePeriodDays(weekStartDate, -7))}
        onCreateEvent={() => setShowModalCreateEvent(true)}
      />
      <Calendar weekDates={weekDates} />
      {showModalCreateEvent && (
        <Modal
          onClose={() => setShowModalCreateEvent(false)}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default App;

// class App extends Component {
//   state = {
//     weekStartDate: new Date(),
//   };

//   render() {
//     const { weekStartDate } = this.state;
//     const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

//     return (
//       <>
//         <Header />
//         <Calendar weekDates={weekDates} />
//       </>
//     );
//   }
// }
