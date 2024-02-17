const db = require('../db');

const checkIdentificationQuery = async (data) => {
  const { rows } = await db.query(
    'SELECT identification_no ' +
      'FROM individual_landlords ' +
      'WHERE identification_no = $1;',
    [data.idNo],
  );

  return rows[0];
};

const checkAlternateIdentificationQuery = async (data) => {
  const { rows } = await db.query(
    'SELECT alternate_identification_no ' +
      'FROM individual_landlords ' +
      "WHERE alternate_identification_no = $1 AND alternate_identification_no <> '';",
    [data.alternateIdNo],
  );

  return rows[0];
};

const checkMobileQuery = async (data) => {
  const { rows } = await db.query(
    'SELECT mobile FROM individual_landlords WHERE mobile = $1;',
    [data.mobile],
  );

  return rows[0];
};

const registerIndividualLandlordQuery = async (data) => {
  const { rows } = await db.query(
    'INSERT INTO individual_landlords ' +
      '(name, identification_no, identification_type, identification_exp, ' +
      'alternate_identification_no, alternate_identification_type, alternate_identification_exp, ' +
      'nationality, address, email, mobile, telephone, fax, po_box) ' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;',
    [
      data.name,
      data.idNo,
      data.idType,
      data.idExp,
      data.alternateIdNo,
      data.alternateIdType,
      data.alternateIdExp,
      data.nationality,
      data.address,
      data.email,
      data.mobile,
      data.telephone,
      data.fax,
      data.poBox,
    ],
  );

  return rows[0];
};

module.exports = {
  checkIdentificationQuery,
  checkAlternateIdentificationQuery,
  checkMobileQuery,
  registerIndividualLandlordQuery,
};
