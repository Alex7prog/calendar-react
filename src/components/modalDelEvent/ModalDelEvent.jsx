import React from 'react';

import './modal-del-event.scss';

const ModalDelEvent = ({ active, onDelete, position }) => {
  // const popupElem = document.querySelector('.popup');
  // if (popupElem) {
  //   popupElem.style.left = `${position.x}px`;
  //   popupElem.style.top = `${position.y}px`;
  // }

  return (
    <div className={active ? 'overlay overlay_active' : 'overlay'} onClick={onDelete}>
      <div
        className={active ? 'popup popup_active' : 'popup'}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      >
        <div className="popup__content">
          <i className="fas fa-trash"></i>
          <span>Delete</span>
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
