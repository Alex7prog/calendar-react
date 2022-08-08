const baseUrl = 'https://62cde2d7066bd2b6992da5e6.mockapi.io/api/v1/events_list';

export const fetchEvents = () => {
  return fetch(baseUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load events');
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
