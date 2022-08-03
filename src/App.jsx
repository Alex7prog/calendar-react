import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import {
  getWeekStartDate,
  generateWeekRange,
  getDatePeriodDays,
  getMonthsOnWeek,
} from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [showModalCreateEvent, setShowModalCreateEvent] = useState(false);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

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
      {showModalCreateEvent && <Modal onClose={() => setShowModalCreateEvent(false)} />}
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
