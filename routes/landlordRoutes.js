const express = require('express');

const {
  checkLandlordIdentifications,
  checkLandlordDetails,
  registerIndividualLandlord,
  registerCompanyLandlord,
  registerCompanyLandlordContact,
} = require('../controllers/landlordController');

const router = express.Router();

router.post('/check-identifications', checkLandlordIdentifications);
router.post('/check-details', checkLandlordDetails);
router.post('/register-individual-landlord', registerIndividualLandlord);
router.post('/register-company-landlord', registerCompanyLandlord);
router.post(
  '/register-company-landlord-contact',
  registerCompanyLandlordContact,
);

module.exports = router;
