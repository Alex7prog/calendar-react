import React from 'react';
import moment from 'moment';

import './modal.scss';

const Modal = ({ active, setActive, date, onClose, onChange, onInputData, onSubmit }) => {
  return (
    <div className={active ? 'overlay overlay_active' : 'overlay'}>
      <div className={active ? 'modal modal_active' : 'modal'}>
        <div className="modal__content">
          <div className="create-event">
            <button className="create-event__close-btn" onClick={onClose}>
              +
            </button>
            <form className="event-form" onSubmit={onSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="event-form__field"
                required
                onChange={onChange}
              />
              <div className="event-form__time">
                <input
                  type="date"
                  name="date"
                  className="event-form__field"
                  // value={moment(date.date).format('YYYY-MM-DD')}
                  value={date.date}
                  onChange={onChange}
                />
                <input
                  type="time"
                  name="startTime"
                  className="event-form__field"
                  step="900"
                  // value={moment(date.startTime).format('HH:mm')}
                  value={date.startTime}
                  required
                  onChange={onChange}
                  onBlur={onInputData}

                  // onChange={handleChange}
                />
                <span>-</span>
                <input
                  type="time"
                  name="endTime"
                  className="event-form__field"
                  step="900"
                  value={date.endTime}
                  required
                  onChange={onChange}
                  onBlur={onInputData}
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                className="event-form__field"
                onChange={onChange}
              ></textarea>
              <button type="submit" className="event-form__submit-btn">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

// class Modal extends Component {
//   render() {
//     return (
//       <div className="modal overlay">
//         <div className="modal__content">
//           <div className="create-event">
//             <button className="create-event__close-btn" onClick={this.props.onClose}>
//               +
//             </button>
//             <form className="event-form">
//               <input type="text" name="title" placeholder="Title" className="event-form__field" />
//               <div className="event-form__time">
//                 <input type="date" name="date" className="event-form__field" />
//                 <input
//                   type="time"
//                   name="startTime"
//                   className="event-form__field"
//                   onChange={this.handleChange}
//                 />
//                 <span>-</span>
//                 <input type="time" name="endTime" className="event-form__field" />
//               </div>
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 className="event-form__field"
//               ></textarea>
//               <button type="submit" className="event-form__submit-btn">
//                 Create
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// return (
//   <div className={active ? 'modal modal_active overlay overlay_active' : 'modal overlay'}>
//     {/* <div className={active ? 'modal__content_active' : 'modal__content'}> */}
//     <div className="modal__content">
//       <div className="create-event">
//         <button className="create-event__close-btn" onClick={onClose}>
//           +
//         </button>
//         <form className="event-form" onSubmit={onSubmit}>
//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
//             className="event-form__field"
//             required
//             onChange={onChange}
//           />
//           <div className="event-form__time">
//             <input
//               type="date"
//               name="date"
//               className="event-form__field"
//               value={moment(date).format('YYYY-MM-DD')}
//               onChange={onChange}
//             />
//             <input
//               type="time"
//               name="startTime"
//               className="event-form__field"
//               step="900"
//               value={moment(date).format('HH:mm')}
//               onChange={onChange}
//               // onChange={handleChange}
//             />
//             <span>-</span>
//             <input
//               type="time"
//               name="endTime"
//               className="event-form__field"
//               step="900"
//               onChange={onChange}
//             />
//           </div>
//           <textarea
//             name="description"
//             placeholder="Description"
//             className="event-form__field"
//             onChange={onChange}
//           ></textarea>
//           <button type="submit" className="event-form__submit-btn">
//             Create
//           </button>
//         </form>
//       </div>
//     </div>
//   </div>
// );
