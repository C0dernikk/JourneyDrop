const Trip = require('../models/Trip');

// @desc    Create a new trip
// @route   POST /api/trips
// @access  Public
const createTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all trips
// @route   GET /api/trips
// @access  Public
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ date: 1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTrip,
  getTrips,
};
