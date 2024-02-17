const landlordQueries = require('../queries/landlordQueries');
const { validateEmptyInputs } = require('../utils/validators');

const fieldDisplayNames = {
  name: 'name',
  idNo: 'id number',
  idType: 'id type',
  idExp: 'id expiration date',
  nationality: 'nationality',
  address: 'address',
  mobile: 'mobile number',
  email: 'email address',
};

// @desc    Check identifications
// @route   POST /api/landlords/check-identifications
// @access  Public
const checkLandlordIdentifications = async (req, res, next) => {
  try {
    const errorFields = validateEmptyInputs(
      req.body,
      ['name', 'idNo', 'idType', 'idExp', 'nationality'],
      fieldDisplayNames,
    );

    // Check for empty input fields
    if (errorFields.length > 0) {
      const errorMessage =
        errorFields.length > 1
          ? `Please enter values for the required fields: ${errorFields.slice(0, -1).join(', ')} and ${errorFields.slice(-1)}`
          : `Please enter value for the required field: ${errorFields[0]}`;
      const error = new Error(errorMessage);
      error.statusCode = 400;
      error.errorFields = errorFields;
      throw error;
    }

    // Check for existing identifications
    const existingId = await landlordQueries.checkIdentificationQuery(req.body);
    if (existingId) {
      errorFields.push(req.body.idType);
    }

    const existingAlternateId =
      await landlordQueries.checkAlternateIdentificationQuery(req.body);
    if (existingAlternateId) {
      errorFields.push(req.body.alternateIdType);
    }

    if (errorFields.length > 0) {
      const errorMessage =
        errorFields.length > 1
          ? `${errorFields[0]} and ${errorFields[1]} are already registered for another landlord`
          : `${errorFields[0]} is already registered for another landlord`;
      const error = new Error(errorMessage);
      error.statusCode = 409;
      error.errorFields = errorFields;
      throw error;
    }

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

// @desc    Check details
// @desc    POST /api/landlords/check-details
// @desc    Public
const checkLandlordDetails = async (req, res, next) => {
  try {
    const errorFields = validateEmptyInputs(
      req.body,
      ['address', 'email', 'mobile'],
      fieldDisplayNames,
    );

    // check for empty input fields
    if (errorFields.length > 0) {
      const errorMessage =
        errorFields.length > 1
          ? `Please enter values for the required fields: ${errorFields.slice(0, -1).join(', ')} and ${errorFields.slice(-1)}`
          : `Please enter value for the required field: ${errorFields[0]}`;
      const error = new Error(errorMessage);
      error.statusCode = 400;
      error.errorFields = errorFields;
      throw error;
    }

    // Check for existing mobile number
    const existingMobile = await landlordQueries.checkMobileQuery(req.body);
    if (existingMobile) {
      errorFields.push('mobile');
    }

    if (errorFields.length > 0) {
      const errorMessage =
        errorFields.length > 1
          ? `${errorFields[0]} and ${errorFields[1]} are already registered for another landlord`
          : `${errorFields[0]} is already registered for another landlord`;
      const error = new Error(errorMessage);
      error.statusCode = 409;
      error.errorFields = errorFields;
      throw error;
    }

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

// @desc    Register new individual landlord
// @route   POST /api/landlords/register-individual-landlord
// @access  Public
const registerIndividualLandlord = async (req, res, next) => {
  try {
    const errorFields = validateEmptyInputs(
      req.body,
      [
        'name',
        'idNo',
        'idType',
        'idExp',
        'nationality',
        'address',
        'email',
        'mobile',
      ],
      fieldDisplayNames,
    );

    // Check for empty input fields
    if (errorFields.length > 0) {
      const errorMessage =
        errorFields.length > 1
          ? `Please enter values for the required fields: ${errorFields.slice(0, -1).join(', ')} and ${errorFields.slice(-1)}`
          : `Please enter value for the required field: ${errorFields[0]}`;
      const error = new Error(errorMessage);
      error.statusCode = 400;
      error.errorFields = errorFields;
      throw error;
    }

    // Save landlord details to database
    const newIndividualLandlord =
      await landlordQueries.registerIndividualLandlordQuery(req.body);

    // Send response with landlord details
    res.status(201).json(newIndividualLandlord);
  } catch (err) {
    next(err);
  }
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
  checkLandlordIdentifications,
  checkLandlordDetails,
  registerIndividualLandlord,
  registerCompanyLandlord,
  registerCompanyLandlordContact,
};
