const Parcel = require('../models/Parcel');
const Trip = require('../models/Trip');

// @desc    Get trips that match a parcel's destination
// @route   GET /api/matches
// @access  Public
const getMatchingTrips = async (req, res) => {
  try {
    const { parcelId } = req.query;

    if (!parcelId) {
      return res.status(400).json({ message: 'parcelId query parameter is required' });
    }

    // Get the parcel
    const parcel = await Parcel.findById(parcelId);

    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }

    // Find trips that match the parcel's destination
    // Match by destination (case-insensitive) and date (trip date should be on or after parcel date)
    const matchingTrips = await Trip.find({
      to: { $regex: new RegExp(parcel.to, 'i') },
      date: { $gte: parcel.date },
    }).sort({ date: 1 });

    res.json({
      parcel,
      matchingTrips,
      count: matchingTrips.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMatchingTrips,
};
