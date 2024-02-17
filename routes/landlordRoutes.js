const express = require('express');

const {
  checkIndividualLandlordIdentifications,
  checkIndividualLandlordDetails,
  registerIndividualLandlord,
  registerCompanyLandlord,
  registerCompanyLandlordContact,
} = require('../controllers/landlordController');

const router = express.Router();

router.post(
  '/check-individual-identifications',
  checkIndividualLandlordIdentifications,
);
router.post('/check-individual-details', checkIndividualLandlordDetails);
router.post('/register-individual-landlord', registerIndividualLandlord);
router.post('/register-company-landlord', registerCompanyLandlord);
router.post(
  '/register-company-landlord-contact',
  registerCompanyLandlordContact,
);

module.exports = router;
