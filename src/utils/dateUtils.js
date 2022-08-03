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

// export const getDatePeriodDays = (date, days) => {
//   const day = new Date(date).getDate();
//   const dateInFuture = new Date(date).setDate(day + days);
//   return new Date(dateInFuture);
// };

export const getDatePeriodDays = (startDate, period) => {
  // const day = new Date(date).getDate();
  // const dateInFuture = new Date(date).setDate(day + days);
  // return new Date(dateInFuture);

  const base = new Date(startDate);
  return new Date(base.setDate(base.getDate() + period));
};

export const getMonthsOnWeek = date => {
  const startWeekMonth = date.getMonth();
  const endWeekMonth = getDatePeriodDays(date, 7).getMonth();

  if (startWeekMonth === endWeekMonth) {
    return months[startWeekMonth];
  }

  return `${months[startWeekMonth]} - ${months[endWeekMonth]}`;
};
