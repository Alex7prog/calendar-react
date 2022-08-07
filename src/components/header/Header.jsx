import React from 'react';

import './header.scss';

const Header = ({ monthTitle, numberEvent, onToday, onNextWeek, onPrevWeek, onCreateEvent }) => {
  return (
    <header className="header">
      <button className="button create-event-btn" onClick={onCreateEvent}>
        {/* <i className="fas fa-plus create-event-btn__icon"></i>Create */}
        <i className="create-event-btn__icon">
          <svg className="create-event-btn__icon-svg" width="36" height="36" viewBox="0 0 36 36">
            <path fill="#34A853" d="M16 16v14h4V20z"></path>
            <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
            <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
            <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
            <path fill="none" d="M0 0h36v36H0z"></path>
          </svg>
        </i>
        <span className="create-event-btn__text">Create</span>
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={onToday}>
          Today
        </button>
        <button className="icon-button navigation__nav-icon" onClick={onPrevWeek}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={onNextWeek}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">{monthTitle}</span>
      </div>
      <span className="header__displayed-number-events">{`${numberEvent} events planned`}</span>
    </header>
  );
};

export default Header;
