const Parcel = require('../models/Parcel');

// @desc    Create a new parcel
// @route   POST /api/parcels
// @access  Public
const createParcel = async (req, res) => {
  try {
    const parcel = await Parcel.create(req.body);
    res.status(201).json(parcel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all parcels
// @route   GET /api/parcels
// @access  Public
const getParcels = async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};
    
    if (status) {
      query.status = status;
    }
    
    const parcels = await Parcel.find(query).sort({ createdAt: -1 });
    res.json(parcels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createParcel,
  getParcels,
};
