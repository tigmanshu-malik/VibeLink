import api from '../api/axios.jsx';

// Get all events
export const getEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

// Get a single event
export const getEvent = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

// Create a new event
export const createEvent = async (eventData) => {
  const response = await api.post('/events', eventData);
  return response.data;
};

// Update an event
export const updateEvent = async (id, eventData) => {
  const response = await api.put(`/events/${id}`, eventData);
  return response.data;
};

// Delete an event
export const deleteEvent = async (id) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};

// Enroll in an event
export const enrollInEvent = async (id) => {
  const response = await api.post(`/events/${id}/enroll`);
  return response.data;
};

// Get user's enrolled events
export const getEnrolledEvents = async () => {
  const response = await api.get('/events/enrolled');
  return response.data;
}; 