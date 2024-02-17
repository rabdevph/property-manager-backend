const colors = require('colors');
const db = require('../db');

const initializeTables = async () => {
  try {
    console.log(colors.green('Initializing required tables'));

    await db.query('BEGIN');

    await db.query(
      'CREATE TABLE IF NOT EXISTS individual_landlords (' +
        'id SERIAL PRIMARY KEY, ' +
        'name VARCHAR(255), ' +
        'identification_no VARCHAR(255) UNIQUE, ' +
        'identification_type VARCHAR(255), ' +
        'identification_exp DATE, ' +
        'alternate_identification_no VARCHAR(255) UNIQUE, ' +
        'alternate_identification_type VARCHAR(255), ' +
        'alternate_identification_exp DATE, ' +
        'nationality VARCHAR(255), ' +
        'address VARCHAR(255), ' +
        'email VARCHAR(255) UNIQUE, ' +
        'mobile VARCHAR(255) UNIQUE, ' +
        'telephone VARCHAR(255), ' +
        'fax VARCHAR(255), ' +
        'po_box VARCHAR(255) ' +
        ');',
    );

    await db.query(
      'CREATE TABLE IF NOT EXISTS company_landlords_contacts (' +
        'id SERIAL PRIMARY KEY, ' +
        'name VARCHAR(255), ' +
        'identification_no VARCHAR(255) UNIQUE, ' +
        'identification_type VARCHAR(255), ' +
        'identification_exp DATE, ' +
        'alternate_identification_no VARCHAR(255) UNIQUE, ' +
        'alternate_identification_type VARCHAR(255), ' +
        'alternate_identification_exp DATE, ' +
        'nationality VARCHAR(255), ' +
        'address VARCHAR(255), ' +
        'email VARCHAR(255) UNIQUE, ' +
        'mobile VARCHAR(255) UNIQUE, ' +
        'telephone VARCHAR(255), ' +
        'fax VARCHAR(255), ' +
        'po_box VARCHAR(255) ' +
        ');',
    );

    await db.query(
      'CREATE TABLE IF NOT EXISTS company_landlords (' +
        'id SERIAL PRIMARY KEY, ' +
        'name VARCHAR(255), ' +
        'trade_license VARCHAR(255) UNIQUE, ' +
        'trade_license_exp DATE, ' +
        'address VARCHAR(255), ' +
        'email VARCHAR(255), ' +
        'telephone VARCHAR(255), ' +
        'fax VARCHAR(255), ' +
        'po_box VARCHAR(255), ' +
        'contact_person INT, ' +
        'FOREIGN KEY (contact_person) REFERENCES company_landlords_contacts(id) ' +
        ');',
    );

    await db.query(
      'CREATE TABLE IF NOT EXISTS properties (' +
        'id SERIAL PRIMARY KEY, ' +
        'usage VARCHAR(255), ' +
        'type VARCHAR(255), ' +
        'community VARCHAR(255), ' +
        'plot_no VARCHAR(255), ' +
        'municipality_no VARCHAR(255), ' +
        'makani_no VARCHAR(255), ' +
        'building_name VARCHAR(255), ' +
        'unit_no VARCHAR(255), ' +
        'floor_no VARCHAR(255), ' +
        'size VARCHAR(255), ' +
        'dewa_premise_no VARCHAR(255), ' +
        'landlord_id INT, ' +
        'FOREIGN KEY (landlord_id) REFERENCES individual_landlords(id) DEFERRABLE INITIALLY DEFERRED, ' +
        'FOREIGN KEY (landlord_id) REFERENCES company_landlords(id) DEFERRABLE INITIALLY DEFERRED ' +
        ');',
    );

    await db.query('COMMIT');
    console.log(colors.green('Successfully created required tables'));
  } catch (err) {
    await db.query('ROLLBACK');
    console.error(colors.red('Error creating required tables'));
    console.log(err);
    process.exit(1);
  }
};

module.exports = { initializeTables };
