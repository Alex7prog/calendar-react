import React, { useState, useEffect } from 'react';
import './time-line.scss';

const TimeLine = () => {
  let hour = new Date().getHours() * 60;

  const [currentMinutes, setTime] = useState(hour + new Date().getMinutes());

  useEffect(() => {
    const intervalHours = setInterval(() => {
      hour = new Date().getHours() * 60;
    }, 60 * 60000);
    const intervalMinutes = setInterval(() => {
      setTime(hour + new Date().getMinutes());
    }, 60000);

    return () => {
      clearInterval(intervalHours);
      clearInterval(intervalMinutes);
    };
  }, []);

  const lineStyle = {
    marginTop: currentMinutes - 1,
  };

  return (
    <div className="red-line" style={lineStyle}>
      <i className="fas fa-circle red-line__circle"></i>
    </div>
  );
};

export default TimeLine;
