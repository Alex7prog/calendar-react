import { getDateTime, gapMinutes, isEventOverlaps } from './dateUtils';

export const isEventValid = (event, eventsList) => {
  const { date, startTime, endTime } = event;

  if (getDateTime(date, startTime) < new Date()) {
    alert(`Sorry, cannot create an event in the past!`);
    return false;
  }

  if (startTime > endTime) {
    alert('Sorry, but start of event later than end of event!');
    return false;
  }

  if (gapMinutes(startTime, endTime) > 360) {
    alert('Sorry, but the scheduled event cannot be longer than 6 hours!');
    return false;
  }

  if (gapMinutes(startTime, endTime) < 15) {
    alert('Sorry, but the scheduled event cannot be less than 15 minutes!');
    return false;
  }

  if (isEventOverlaps(date, startTime, endTime, eventsList)) {
    alert(`Sorry, but events can't overlap!`);
    return false;
  }

  return true;
};
