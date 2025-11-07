const express = require('express');
const router = express.Router();
const {
  getMatchingTrips,
} = require('../controllers/matchController');

router.route('/')
  .get(getMatchingTrips);

module.exports = router;
