import React from 'react';

import './modal-del-event.scss';

const ModalDelEvent = ({ onDelete, position }) => {
  return (
    <div className="overlay" onClick={onDelete}>
      <div
        className="popup"
        style={{ position: 'absolute', left: `${position.x}px`, top: `${position.y}px` }}
      >
        <div className="popup__content">
          {/* <div className="create-event"> */}
          {/* <div className="create-event__delete"> */}
          <i className="fas fa-trash"></i>
          <span>Delete</span>
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default ModalDelEvent;

// return (
//   <div className="modal overlay" onClick={onDelete}>
//     <div
//       className="modal__content"
//       style={{ position: 'absolute', left: `${position.x}px`, top: `${position.y}px` }}
//     >
//       <div className="create-event">
//         <div className="create-event__delete">
//           <i className="fas fa-trash"></i>
//           <span>Delete</span>
//         </div>
//       </div>
//     </div>
//   </div>
// );
