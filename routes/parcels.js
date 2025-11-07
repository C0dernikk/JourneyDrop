const express = require('express');
const router = express.Router();
const {
  createParcel,
  getParcels,
} = require('../controllers/parcelController');

router.route('/')
  .post(createParcel)
  .get(getParcels);

module.exports = router;
