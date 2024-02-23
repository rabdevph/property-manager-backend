const db = require('../db');

const checkIdentificationsQuery = async (data) => {
  const { rows } = await db.query(
    'SELECT identification_no, alternate_identification_no ' +
      'FROM individual_landlords ' +
      'WHERE (identification_no = $1 OR identification_no = $2) ' +
      'OR (alternate_identification_no = $1 OR alternate_identification_no = $2);',
    [data.idNo, data.alternateIdNo],
  );

  return rows[0];
};

const checkEmailQuery = async (data) => {
  const { rows } = await db.query(
    'SELECT email FROM individual_landlords WHERE email = $1;',
    [data.email],
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

const getAllLandlordQuery = async () => {
  const { rows } = await db.query(
    'SELECT * FROM individual_landlords ORDER BY id;',
  );

  return rows;
};

const registerLandlordQuery = async (data) => {
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
  checkIdentificationsQuery,
  checkMobileQuery,
  checkEmailQuery,
  getAllLandlordQuery,
  registerLandlordQuery,
};
