const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  date: {
    type: Date,
    required: [true, 'Please add a date']
  },
  time: {
    type: String,
    required: [true, 'Please add a time']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Sports', 'Music', 'Art', 'Technology', 'Food', 'Other']
  },
  image: {
    type: String,
    default: 'no-photo.jpg'
  },
  capacity: {
    type: Number,
    required: [true, 'Please add a capacity']
  },
  enrolledUsers: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  organizer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', EventSchema); 