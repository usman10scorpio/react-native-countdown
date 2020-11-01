import {Platform} from 'react-native';
import moment from 'moment';
import uuid from 'uuid';

export const baseUrl =
  Platform.OS === 'android'
    ? 'http://192.168.1.8:3000/events'
    : 'http://192.168.1.8:3000/events';

export function getEvents() {
  return fetch(baseUrl)
    .then((response) => response.json())
    .then((events) => events.map((e) => ({...e, date: new Date(e.date)})))
    .catch((error) => console.log(error));
}

export function saveEvent({title, date}) {
  return fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify({
      title,
      date,
      uuid,
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function formatDate(dateString) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }

  return parsed.format('D MMM YYYY');
}

export function getCountdownParts(eventDate) {
  const duration = moment.duration(
    moment(new Date(eventDate)).diff(new Date()),
  );
  return {
    days: parseInt(duration.as('days')),
    hours: duration.get('hours'),
    minutes: duration.get('minutes'),
    seconds: duration.get('seconds'),
  };
}
