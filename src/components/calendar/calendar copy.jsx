// import React, { useEffect, useState } from 'react';

// import Navigation from './../navigation/Navigation';
// import Week from '../week/Week';
// import Sidebar from '../sidebar/Sidebar';
// import { fetchEvents, deleteEvent } from '../../gateway/events';
// // import events from '../../gateway/events';

// import ModalDelEvent from '../modalDelEvent/ModalDelEvent';

// import './calendar.scss';

// export const EventDeleteContext = React.createContext();

// const Calendar = ({ weekDates, events }) => {
//   console.log('events: >>>>>>', events);
//   const [eventsList, setEventsList] = useState([events]);
//   const [eventId, setEventId] = useState(null);

//   const [showModalDelEvent, setShowModalDelEvent] = useState(false);
//   const [positionModal, setPositionModal] = useState({ x: 0, y: 0 });

//   const fetchEventsList = () => {
//     fetchEvents()
//       .then(events => {
//         setEventsList(
//           events.map(event => ({
//             ...event,
//             dateFrom: new Date(event.dateFrom),
//             dateTo: new Date(event.dateTo),
//           })),
//         );
//       })
//       .catch(error => alert(error));
//   };

//   useEffect(() => {
//     console.log(111);
//     fetchEventsList();
//   }, [events]);

//   const handleModalDelEvent = e => {
//     if (e.target.classList.contains('overlay')) {
//       setShowModalDelEvent(false);
//       return;
//     }

//     if (e.target.closest('.popup__content')) {
//       deleteEvent(eventId)
//         .then(() => fetchEventsList())
//         .catch(error => alert(error));

//       setShowModalDelEvent(false);
//     }
//   };

//   const handleDeleteEvent = e => {
//     const { clientX, clientY } = e;
//     clientX > 155
//       ? setPositionModal({ x: clientX - 130, y: clientY - 30 })
//       : setPositionModal({ x: clientX + 5, y: clientY - 30 });

//     setShowModalDelEvent(true);
//     setEventId(e.target.closest('.event').dataset.id);
//   };

//   console.log('eventsList: ', eventsList);
//   // setEventsList(events);
//   return (
//     <section className="calendar">
//       <Navigation weekDates={weekDates} />
//       <div className="calendar__body">
//         <div className="calendar__week-container">
//           <Sidebar />
//           <EventDeleteContext.Provider value={handleDeleteEvent}>
//             <Week
//               weekDates={weekDates}
//               events={eventsList}
//               // onEventDelete={() => setShowModalDelEvent(true)
//               // onEventDelete={handleDeleteEvent}
//             />
//           </EventDeleteContext.Provider>
//           {showModalDelEvent && (
//             <ModalDelEvent
//               // onClose={() => setShowModalDelEvent(false)}
//               // onChange={handleChange}
//               position={positionModal}
//               onDelete={handleModalDelEvent}
//             />
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Calendar;

// // class Calendar extends Component {
// //   state = {
// //     events,
// //   };

// //   render() {
// //     const { weekDates } = this.props;
// //     // console.log('props: ', this.props);
// //     // console.log(this.state.events);
// //     return (
// //       <section className="calendar">
// //         <Navigation weekDates={weekDates} />
// //         <div className="calendar__body">
// //           <div className="calendar__week-container">
// //             <Sidebar />
// //             <Week weekDates={weekDates} events={this.state.events} />
// //           </div>
// //         </div>
// //       </section>
// //     );
// //   }
// // }