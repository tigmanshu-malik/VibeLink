const express = require('express');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  enrollInEvent,
  getEnrolledEvents
} = require('../controllers/eventController');

const router = express.Router();
const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(getEvents)
  .post(protect, createEvent);

router
  .route('/enrolled')
  .get(protect, getEnrolledEvents);

router
  .route('/:id')
  .get(getEvent)
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);

router
  .route('/:id/enroll')
  .post(protect, enrollInEvent);

module.exports = router; 