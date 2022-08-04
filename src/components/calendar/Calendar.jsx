import React, { useState } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import events from '../../gateway/events';
import ModalDelEvent from '../modalDelEvent/ModalDelEvent';

import './calendar.scss';

const Calendar = ({ weekDates }) => {
  const [eventsList, setEventsList] = useState(events);
  const [eventId, setEventId] = useState(null);

  const [showModalDelEvent, setShowModalDelEvent] = useState(false);
  const [positionModal, setPositionModal] = useState({ x: 0, y: 0 });

  const handleModalDelEvent = e => {
    if (e.target.classList.contains('overlay')) {
      setShowModalDelEvent(false);
      return;
    }

    if (e.target.closest('.popup__content')) {
      const copyEventsList = [...eventsList];
      const index = copyEventsList.findIndex(event => event.id.toString() === eventId.toString());
      copyEventsList.splice(index, 1);

      setShowModalDelEvent(false);
      setEventsList(copyEventsList);
    }
  };

  const handleDeleteEvent = e => {
    const { clientX, clientY } = e;

    // const modalElem = document.querySelector('.modal__content');
    // console.log(modalElem.clientWidth);

    clientX > 155
      ? setPositionModal({ x: clientX - 130, y: clientY - 30 })
      : setPositionModal({ x: clientX + 5, y: clientY - 30 });

    setShowModalDelEvent(true);
    setEventId(e.target.closest('.event').dataset.id);
  };

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={eventsList}
            // onEventDelete={() => setShowModalDelEvent(true)
            onEventDelete={handleDeleteEvent}
          />
          {showModalDelEvent && (
            <ModalDelEvent
              // onClose={() => setShowModalDelEvent(false)}
              // onChange={handleChange}
              position={positionModal}
              onDelete={handleModalDelEvent}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Calendar;

// class Calendar extends Component {
//   state = {
//     events,
//   };

//   render() {
//     const { weekDates } = this.props;
//     // console.log('props: ', this.props);
//     // console.log(this.state.events);
//     return (
//       <section className="calendar">
//         <Navigation weekDates={weekDates} />
//         <div className="calendar__body">
//           <div className="calendar__week-container">
//             <Sidebar />
//             <Week weekDates={weekDates} events={this.state.events} />
//           </div>
//         </div>
//       </section>
//     );
//   }
// }
