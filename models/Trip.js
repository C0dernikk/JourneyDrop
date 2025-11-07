const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  travelerName: {
    type: String,
    required: [true, 'Please provide traveler name'],
    trim: true,
  },
  from: {
    type: String,
    required: [true, 'Please provide origin'],
    trim: true,
  },
  to: {
    type: String,
    required: [true, 'Please provide destination'],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Please provide date'],
  },
  capacity: {
    type: Number,
    required: [true, 'Please provide capacity'],
    min: [1, 'Capacity must be at least 1'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Trip', tripSchema);
