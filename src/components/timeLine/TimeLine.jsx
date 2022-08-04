import React from 'react';
import './time-line.scss';

const TimeLine = ({ marginTop }) => {
  const lineStyle = {
    marginTop,
  };

  return (
    <div className="red-line" style={lineStyle}>
      <i className="fas fa-circle red-line__circle"></i>
    </div>
  );
  // return <div className="red-line"></div>;
};

export default TimeLine;

// <div style={lineStyle}>
//   <i class="fas fa-circle"></i>
//   <span className="red-line"></span>
// </div>;
