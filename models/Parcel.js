const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: [true, 'Please provide sender name'],
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
  weight: {
    type: Number,
    required: [true, 'Please provide weight'],
    min: [0.1, 'Weight must be at least 0.1 kg'],
  },
  date: {
    type: Date,
    required: [true, 'Please provide date'],
  },
  status: {
    type: String,
    enum: ['pending', 'matched', 'in_transit', 'delivered', 'cancelled'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Parcel', parcelSchema);
