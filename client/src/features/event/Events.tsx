import React, { useEffect, useState } from 'react';
import { Placeholder } from 'react-bootstrap';
import Event, { EventProps } from './Event';

const fetchEvents = async (startIndex: number, endIndex: number) => {
  const query = `
    {
      getUpcomingEvents(startIndex: ${startIndex}, endIndex: ${endIndex}) {
        id
        name
        description
        startDate
        endDate
      }
    }`;
  try {
    const token = process.env.REACT_APP_AUTH_TOKEN || '';
    const response = await fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query })
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const result = await response.json();
    return result.data.getUpcomingEvents;
  } catch (err) {
    console.error(err);
    return [];
  }
}

const throttle = (func: Function, timeFrame: number) => {
  let lastTime = 0;
  return () => {
    const now = Date.now();
    if (now - lastTime >= timeFrame) {
      func();
      lastTime = now;
    }
  };
}

const Events = () => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hasFetchedAllEvents, setHasFetchedAllEvents] = useState(false);
  const eventsPerFetch = 50;

  const onScroll = throttle(() => {
    if (hasFetchedAllEvents || events.length <= currentIdx) return;

    // Fetch new events once close to bottom
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop > 0 && scrollTop >= scrollHeight - clientHeight * 2) {
      setCurrentIdx(prevValue => prevValue + eventsPerFetch);
    }
  }, 100);

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    }
  }, [onScroll]);

  useEffect(() => {
    let unmount = false;
    const asyncFetch = async () => {
      const newEvents = await fetchEvents(currentIdx, currentIdx + eventsPerFetch);
      if (!unmount) {
        setEvents(prevState => [...prevState, ...newEvents]);
        setHasFetchedAllEvents(newEvents.length < eventsPerFetch);
      }
    }
    asyncFetch();

    return () => {
      unmount = true;
    }
  }, [currentIdx]);

  return (
    <>
      {
        events.map((event: EventProps) => {
          const { id, name, description, startDate, endDate } = event;
          return <Event 
            key={id} 
            id={id} 
            name={name} 
            description={description} 
            startDate={startDate} 
            endDate={endDate}
          />
        })
      }
      {
        !hasFetchedAllEvents && events.length <= currentIdx &&
          <Placeholder />
      }
    </>
  );
}

export default Events
