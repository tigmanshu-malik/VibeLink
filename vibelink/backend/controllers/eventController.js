const Event = require('../models/Event');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = asyncHandler(async (req, res, next) => {
  const events = await Event.find().populate('organizer', 'name profileImage');
  res.status(200).json({
    success: true,
    count: events.length,
    data: events
  });
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id).populate('organizer', 'name profileImage');
  
  if (!event) {
    return next(new ErrorResponse(`Event not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: event
  });
});

// @desc    Create new event
// @route   POST /api/events
// @access  Private
exports.createEvent = asyncHandler(async (req, res, next) => {
  // Add organizer to req.body
  req.body.organizer = req.user.id;

  const event = await Event.create(req.body);
  res.status(201).json({
    success: true,
    data: event
  });
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
exports.updateEvent = asyncHandler(async (req, res, next) => {
  let event = await Event.findById(req.params.id);

  if (!event) {
    return next(new ErrorResponse(`Event not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is event organizer
  if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this event`, 401));
  }

  event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: event
  });
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
exports.deleteEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new ErrorResponse(`Event not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is event organizer
  if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this event`, 401));
  }

  await event.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Enroll in event
// @route   POST /api/events/:id/enroll
// @access  Private
exports.enrollInEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new ErrorResponse(`Event not found with id of ${req.params.id}`, 404));
  }

  // Check if user is already enrolled
  if (event.enrolledUsers.includes(req.user.id)) {
    return next(new ErrorResponse('User is already enrolled in this event', 400));
  }

  // Check if event is at capacity
  if (event.enrolledUsers.length >= event.capacity) {
    return next(new ErrorResponse('Event is at capacity', 400));
  }

  event.enrolledUsers.push(req.user.id);
  await event.save();

  res.status(200).json({
    success: true,
    data: event
  });
});

// @desc    Get user's enrolled events
// @route   GET /api/events/enrolled
// @access  Private
exports.getEnrolledEvents = asyncHandler(async (req, res, next) => {
  const events = await Event.find({ enrolledUsers: req.user.id }).populate('organizer', 'name profileImage');
  
  res.status(200).json({
    success: true,
    count: events.length,
    data: events
  });
}); 