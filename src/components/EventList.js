import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import { useAuth } from '../context/AuthContext';

const EventList = () => {
  const { user } = useAuth(); 
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const eventsPerPage = 5;

  useEffect(() => {
    const fetchEvents = () => {
      setLoading(true);
      setError(null);

      const mockEvents = [
        { id: 1, title: 'Concert', description: 'Live music performance', category: 'Music', date: '2024-12-01', availableSeats: 10, price: 30 },
        { id: 2, title: 'Theater Play', description: 'A dramatic performance', category: 'Theater', date: '2024-12-02', availableSeats: 0, price: 20 },
        { id: 3, title: 'Art Exhibition', description: 'Gallery of modern art', category: 'Art', date: '2024-12-03', availableSeats: 5, price: 15 },
        { id: 4, title: 'Tech Talk', description: 'Discussion on new technology', category: 'Tech', date: '2024-12-04', availableSeats: 3, price: 10 },
        { id: 5, title: 'Cooking Class', description: 'Learn to cook Italian food', category: 'Food', date: '2024-12-05', availableSeats: 2, price: 50 },
        { id: 6, title: 'Yoga Retreat', description: 'Relax and rejuvenate with yoga', category: 'Health', date: '2024-12-06', availableSeats: 0, price: 25 },
      ];

      setEvents(mockEvents);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => event.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter((event) => (categoryFilter ? event.category === categoryFilter : true));
  }, [events, searchQuery, categoryFilter]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleBookTicket = (eventId) => {
    const updatedEvents = events.map((event) => {
      if (event.id === eventId && event.availableSeats > 0) {
        return { ...event, availableSeats: event.availableSeats - 1 };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  return (
    <div>
      <h1>Event List</h1>

      <input
        type="text"
        placeholder="Search events"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
        <option value="">All Categories</option>
        <option value="Music">Music</option>
        <option value="Theater">Theater</option>
        <option value="Art">Art</option>
        <option value="Tech">Tech</option>
        <option value="Food">Food</option>
        <option value="Health">Health</option>
      </select>

      {loading && <p>Loading events...</p>}
      {error && <p>{error}</p>}

      <div>
        {currentEvents.map((event) => (
          <div key={event.id} className="event-item">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>Category: {event.category}</p>
            <p>Date: {event.date}</p>
            <p>Price: ${event.price}</p>
            <p>Available Seats: {event.availableSeats}</p>
            <Link to={`/event/${event.id}`}>View Details</Link>

            {user ? (
              event.availableSeats > 0 ? (
                <button onClick={() => handleBookTicket(event.id)}>Book Ticket</button>
              ) : (
                <button disabled>Sold Out</button>
              )
            ) : (
              <p>Please log in to book tickets.</p>
            )}
          </div>
        ))}
      </div>

      <Pagination
        totalItems={filteredEvents.length}
        itemsPerPage={eventsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default EventList;