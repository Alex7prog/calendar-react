import moment from 'moment';

export const getWeekStartDate = date => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference =
    dayOfWeek === 0
      ? -6 // for Sunday
      : 1 - dayOfWeek;

  const monday = new Date(dateCopy.setDate(date.getDate() + difference));
  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
};

export const generateWeekRange = startDate => {
  const result = [];
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate);
    result.push(new Date(base.setDate(base.getDate() + i)));
  }
  return result;
};

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));
  return withMinutes;
};

export const formatMins = mins => {
  return mins < 10 ? `0${mins}` : mins;
};

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// *******************************************

export const getDatePeriodDays = (startDate, period) => {
  const base = new Date(startDate);
  return new Date(base.setDate(base.getDate() + period));
};

export const getMonthsOnWeek = date => {
  const startWeekMonth = date.getMonth();
  const endWeekMonth = getDatePeriodDays(date, 6).getMonth();

  if (startWeekMonth === endWeekMonth) {
    return `${months[startWeekMonth]}`;
  }

  return `${months[startWeekMonth]} - ${months[endWeekMonth]}`;
};

export const getMinutesWithStep = (timeStr, step) => {
  let hm = timeStr.split(':');
  hm[1] = Math.round(hm[1] / step) * step;
  hm[1] = hm[1] >= 60 ? '00' : hm[1].toString();

  return hm[1] !== '0' ? hm.join(':') : hm.join(':0');
};

export const getEventObjDate = date => {
  return {
    title: '',
    date: moment(date).format('YYYY-MM-DD'),
    startTime: getMinutesWithStep(moment(date).format('HH:mm'), 15),
    endTime: getMinutesWithStep(moment(date).format('HH:mm'), 15),
    description: '',
  };
};

export const gapMinutes = (startTime, endTime) => {
  const hmStart = startTime.split(':');
  const hmEnd = endTime.split(':');

  return Math.abs((hmEnd[0] - hmStart[0]) * 60 + (hmEnd[1] - hmStart[1]));
};

export const isEventCanDel = (eventTime, eventDate) => {
  const curDate = new Date().getTime();
  const evDate = new Date(
    2022,
    eventDate.month,
    eventDate.day,
    eventTime.split(':')[0],
    eventTime.split(':')[1],
  ).getTime();

  if (evDate > curDate && evDate - curDate < 15 * 60000) {
    return true;
  }

  return false;
};

export const isOverlapEventsList = (date, startTime, endTime, eventsList) => {
  const evStartDate = getDateTime(date, startTime).getTime();
  const evEndDate = getDateTime(date, endTime).getTime();

  return eventsList.some(
    event =>
      (event.dateFrom.getTime() < evStartDate && evStartDate < event.dateTo.getTime()) ||
      (event.dateFrom.getTime() < evEndDate && evEndDate < event.dateTo.getTime()) ||
      (evStartDate < event.dateFrom.getTime() && event.dateTo.getTime() < evEndDate),
  );
};
