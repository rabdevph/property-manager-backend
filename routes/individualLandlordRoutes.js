const express = require('express');

const {
  checkIdentifications,
  checkDetails,
  register,
} = require('../controllers/individualLandlordController');

const router = express.Router();

router.post('/check-identifications', checkIdentifications);
router.post('/check-details', checkDetails);
router.post('/register', register);

module.exports = router;
