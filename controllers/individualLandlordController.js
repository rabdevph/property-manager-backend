const individualLandlordQueries = require('../queries/individualLandlordQueries');
const { validateEmptyInputs } = require('../utils/validators');

const fieldDisplayNames = {
  name: 'name',
  idNo: 'id number',
  idType: 'id type',
  idExp: 'id expiration date',
  alternateIdNo: 'alternate id number',
  alternateIdType: 'alternate id type',
  alternateIdExp: 'alternate id expiration date',
  nationality: 'nationality',
  address: 'address',
  mobile: 'mobile number',
  email: 'email address',
};

const checkEmptyFields = (req, requiredFields) => {
  const errorFields = validateEmptyInputs(
    req.body,
    requiredFields,
    fieldDisplayNames,
  );

  return errorFields;
};

const checkExistingEmailAndMobile = async (req) => {
  const errorFields = [];

  const existingEmail = await individualLandlordQueries.checkEmailQuery(
    req.body,
  );
  if (existingEmail) {
    errorFields.push('email address');
  }

  const existingMobile = await individualLandlordQueries.checkMobileQuery(
    req.body,
  );
  if (existingMobile) {
    errorFields.push('mobile number');
  }

  return errorFields;
};

// @desc    Check identifications
// @route   POST /api/landlords/individual/check-identifications
// @access  Private
const checkIdentifications = async (req, res, next) => {
  try {
    let requiredFields;

    if (
      req.body.alternateIdNo ||
      req.body.alternateIdType ||
      req.body.alternateIdExp
    ) {
      requiredFields = [
        'name',
        'idNo',
        'idType',
        'idExp',
        'alternateIdNo',
        'alternateIdType',
        'alternateIdExp',
        'nationality',
      ];
    } else {
      requiredFields = ['name', 'idNo', 'idType', 'idExp', 'nationality'];
    }
    const emptyFields = checkEmptyFields(req, requiredFields);

    // check empty fields
    if (emptyFields.length > 0) {
      const errorMessage =
        emptyFields.length > 1
          ? `Please enter values for the required fields: ${emptyFields.slice(0, -1).join(', ')} and ${emptyFields.slice(-1)}`
          : `Please enter value for the required field: ${emptyFields[0]}`;
      const error = new Error(errorMessage);
      error.statusCode = 400;
      error.errorFields = emptyFields;
      throw error;
    }

    // check same identification and alternate identification number
    if (req.body.idNo === req.body.alternateIdNo) {
      const errorMessage =
        'Identification number and alternate identification number cannot be the same';
      const error = new Error(errorMessage);
      error.statusCode = 400;
      error.errorFields = [req.body.idType, req.body.alternateIdType];
      throw error;
    }

    // check existing identifications
    const existingId =
      await individualLandlordQueries.checkIdentificationsQuery(req.body);
    if (existingId) {
      const errorFields = [];

      if (
        existingId.identification_no === req.body.idNo ||
        existingId.alternate_identification_no === req.body.idNo
      ) {
        errorFields.push(req.body.idType);
      }

      if (
        existingId.identification_no === req.body.alternateIdNo ||
        existingId.alternate_identification_no === req.body.alternateIdNo
      ) {
        errorFields.push(req.body.alternateIdType);
      }

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
// @desc    POST /api/landlords/individual/check-details
// @desc    Private
const checkDetails = async (req, res, next) => {
  try {
    const requiredFields = ['address', 'email', 'mobile'];
    const emptyFields = checkEmptyFields(req, requiredFields);

    // check empty fields
    if (emptyFields.length > 0) {
      const errorMessage =
        emptyFields.length > 1
          ? `Please enter values for the required fields: ${emptyFields.slice(0, -1).join(', ')} and ${emptyFields.slice(-1)}`
          : `Please enter value for the required field: ${emptyFields[0]}`;
      const error = new Error(errorMessage);
      error.statusCode = 400;
      error.errorFields = emptyFields;
      throw error;
    }

    // Check for existing email address and mobile number
    const existingFields = await checkExistingEmailAndMobile(req);
    if (existingFields.length > 0) {
      const errorMessage =
        existingFields.length > 1
          ? `${existingFields[0]} and ${existingFields[1]} are already registered for another landlord`
          : `${existingFields[0]} is already registered for another landlord`;
      const error = new Error(errorMessage);
      error.statusCode = 409;
      error.errorFields = existingFields;
      throw error;
    }

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

// @desc    Get all individual landlords
// @route   GET /api/landlords/individual/get-all
// @route   Private
const getAll = async (req, res, next) => {
  try {
    const allLandlords = await individualLandlordQueries.getAllLandlordQuery();

    res.status(200).json(allLandlords);
  } catch (err) {
    next(err);
  }
};

// @desc    Register new individual landlord
// @route   POST /api/landlords/individual/register
// @access  Private
const register = async (req, res, next) => {
  try {
    const requiredFields = [
      'name',
      'idNo',
      'idType',
      'idExp',
      'nationality',
      'address',
      'email',
      'mobile',
    ];
    const errorFields = checkEmptyFields(req, requiredFields);

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

    const newIndividualLandlord =
      await individualLandlordQueries.registerLandlordQuery(req.body);
    res.status(201).json(newIndividualLandlord);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkIdentifications,
  checkDetails,
  getAll,
  register,
};
