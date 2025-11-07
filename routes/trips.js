const express = require('express');
const router = express.Router();
const {
  createTrip,
  getTrips,
} = require('../controllers/tripController');

router.route('/')
  .post(createTrip)
  .get(getTrips);

module.exports = router;
