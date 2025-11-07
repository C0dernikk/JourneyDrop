const Booking = require('../models/Booking');
const Parcel = require('../models/Parcel');
const Trip = require('../models/Trip');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  try {
    const { parcelId, tripId } = req.body;

    // Verify parcel and trip exist
    const parcel = await Parcel.findById(parcelId);
    const trip = await Trip.findById(tripId);

    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Check if booking already exists
    const existingBooking = await Booking.findOne({ parcelId, tripId });
    if (existingBooking) {
      return res.status(400).json({ message: 'Booking already exists' });
    }

    const booking = await Booking.create({ parcelId, tripId });
    
    // Populate references
    await booking.populate('parcelId');
    await booking.populate('tripId');

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public
const getBookings = async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('parcelId')
      .populate('tripId')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Public
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['requested', 'accepted', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be: requested, accepted, or completed' });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
      .populate('parcelId')
      .populate('tripId');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getBookings,
  updateBookingStatus,
};

