const baseUrl = 'https://62cde2d7066bd2b6992da5e6.mockapi.io/api/v1/events_list';

export const fetchEvents = () => {
  return fetch(baseUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load events');
        return;
      }
      return response.json();
    })
    .then(events =>
      events.map(event => ({
        ...event,
        dateFrom: new Date(event.dateFrom),
        dateTo: new Date(event.dateTo),
      })),
    );
  // .then(tasksList => tasksList);
};

export const createEvent = eventData => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(eventData),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
  });
};

export const deleteEvent = taskId => {
  return fetch(`${baseUrl}/${taskId}`, {
    method: 'DELETE',
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete event');
    }
  });
};

// const events = [
//   {
//     id: 1,
//     title: 'Go to the gym',
//     description: 'some text here',
//     dateFrom: new Date(2022, 7, 5, 10, 15),
//     dateTo: new Date(2022, 7, 5, 15, 0),
//   },
//   {
//     id: 2,
//     title: 'Go to the school',
//     description: 'hello, 2 am',
//     dateFrom: new Date(2022, 7, 6, 10, 15),
//     dateTo: new Date(2022, 7, 6, 11, 0),
//   },
//   {
//     id: 3,
//     title: 'Lunch',
//     description: '',
//     dateFrom: new Date(2022, 7, 7, 10, 30),
//     dateTo: new Date(2022, 7, 7, 11, 30),
//   },
//   {
//     id: 4,
//     title: 'Meet friend',
//     description: 'at the cafe',
//     dateFrom: new Date(2022, 7, 12, 10, 30),
//     dateTo: new Date(2022, 7, 12, 11, 0),
//   },
//   {
//     id: 5,
//     title: 'Meet friend',
//     description: 'at the cafe',
//     dateFrom: new Date(2022, 7, 5, 0, 1),
//     dateTo: new Date(2022, 7, 5, 2, 0),
//   },
// ];

// export default events;
