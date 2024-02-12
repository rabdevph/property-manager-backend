// @desc    Register new individual landlord
// @route   POST /api/landlords/register-individual-landlord
// @access  Public
const registerIndividualLandlord = (req, res, next) => {
  res.status(200).json({ message: 'register new individual landlord' });
};

// @desc    Register new company landlord
// @route   POST /api/landlords/register-company-landlord
// @access  Public
const registerCompanyLandlord = (req, res, next) => {
  res.status(200).json({ message: 'register new company landlord' });
};

// @desc    Register company landlord contact person
// @route   POST /api/landlords/register-company-landlord-contact
// @access  Public
const registerCompanyLandlordContact = (req, res, next) => {
  res.status(200).json({ message: 'register company landlord contact person' });
};

module.exports = {
  registerIndividualLandlord,
  registerCompanyLandlord,
  registerCompanyLandlordContact,
};
