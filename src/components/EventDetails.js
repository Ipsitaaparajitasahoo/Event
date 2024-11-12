import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const mockEvents = [
      { id: 1, title: 'Concert', description: 'Live music performance', category: 'Music', date: '2024-12-01', availableSeats: 10, price: 30 },
      { id: 2, title: 'Theater Play', description: 'A dramatic performance', category: 'Theater', date: '2024-12-02', availableSeats: 0, price: 20 },
      { id: 3, title: 'Art Exhibition', description: 'Gallery of modern art', category: 'Art', date: '2024-12-03', availableSeats: 5, price: 15 },
      { id: 4, title: 'Tech Talk', description: 'Discussion on new technology', category: 'Tech', date: '2024-12-04', availableSeats: 3, price: 10 },
      { id: 5, title: 'Cooking Class', description: 'Learn to cook Italian food', category: 'Food', date: '2024-12-05', availableSeats: 2, price: 50 },
      { id: 6, title: 'Yoga Retreat', description: 'Relax and rejuvenate with yoga', category: 'Health', date: '2024-12-06', availableSeats: 0, price: 25 },
    ];

    const event = mockEvents.find((event) => event.id === parseInt(id));
    setEvent(event);
  }, [id]);

  return (
    <div>
      {event ? (
        <>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <p>Category: {event.category}</p>
          <p>Date: {event.date}</p>
          <p>Price: ${event.price}</p>
          <p>Available Seats: {event.availableSeats}</p>
        </>
      ) : (
        <p>Event not found.</p>
      )}
    </div>
  );
};

export default EventDetails;