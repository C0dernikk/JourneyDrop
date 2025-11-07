const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  parcelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parcel',
    required: [true, 'Please provide parcel ID'],
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: [true, 'Please provide trip ID'],
  },
  status: {
    type: String,
    enum: ['requested', 'accepted', 'completed'],
    default: 'requested',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);

