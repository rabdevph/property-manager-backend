const express = require('express');

const {
  registerIndividualLandlord,
  registerCompanyLandlord,
  registerCompanyLandlordContact,
} = require('../controllers/landlordController');

const router = express.Router();

router.post('/register-individual-landlord', registerIndividualLandlord);
router.post('/register-company-landlord', registerCompanyLandlord);
router.post(
  '/register-company-landlord-contact',
  registerCompanyLandlordContact,
);

module.exports = router;
