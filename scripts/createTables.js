const colors = require('colors');
const db = require('../db');

const initializeTables = async () => {
  try {
    console.log(colors.green('Initializing required tables'));

    await db.query('BEGIN');

    await db.query(
      'CREATE TABLE IF NOT EXISTS company_landlords_contacts (' +
        'id SERIAL PRIMARY KEY, ' +
        'name VARCHAR(255), ' +
        'address VARCHAR(255), ' +
        'passport_no VARCHAR(255) UNIQUE, ' +
        'eid_no VARCHAR(255) UNIQUE, ' +
        'nationality VARCHAR(255), ' +
        'tel_no VARCHAR(255), ' +
        'mobile_no VARCHAR(255), ' +
        'fax_no VARCHAR(255), ' +
        'po_box_no VARCHAR(255), ' +
        'email_address VARCHAR(255) ' +
        ');',
    );

    await db.query(
      'CREATE TABLE IF NOT EXISTS company_landlords (' +
        'id SERIAL PRIMARY KEY, ' +
        'name VARCHAR(255), ' +
        'address VARCHAR(255), ' +
        'trade_license VARCHAR(255) UNIQUE, ' +
        'tel_no VARCHAR(255), ' +
        'mobile_no VARCHAR(255), ' +
        'fax_no VARCHAR(255), ' +
        'po_box_no VARCHAR(255), ' +
        'email_address VARCHAR(255), ' +
        'contact_person INT, ' +
        'FOREIGN KEY (contact_person) REFERENCES company_landlords_contacts(id) ' +
        ');',
    );

    await db.query(
      'CREATE TABLE IF NOT EXISTS individual_landlords (' +
        'id SERIAL PRIMARY KEY, ' +
        'name VARCHAR(255), ' +
        'address VARCHAR(255), ' +
        'passport_no VARCHAR(255) UNIQUE, ' +
        'eid_no VARCHAR(255) UNIQUE, ' +
        'nationality VARCHAR(255), ' +
        'tel_no VARCHAR(255), ' +
        'mobile_no VARCHAR(255), ' +
        'fax_no VARCHAR(255), ' +
        'po_box_no VARCHAR(255), ' +
        'email_address VARCHAR(255) ' +
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
