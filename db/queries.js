/* eslint-disable no-param-reassign */
const db = require('./index');

exports.newCustomer = async ({
  customerID, firstName, lastName, dob, city, country, email,
}) => {
  email = email.toLowerCase();
  try {
    const countryQuery = 'SELECT id FROM countries WHERE country ILIKE $1';
    const countryData = await db.query(countryQuery, [country]);
    const countryID = countryData.rows[0].id;
    const query = `
      INSERT INTO customers (
        id, first_name, last_name, DOB, city, country_ID, email
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7
      )`;
    return db.query(query, [customerID, firstName, lastName, dob, city, countryID, email]);
  } catch (error) {
    throw new Error('error adding customer', error);
  }
};

exports.newOrder = async ({ orderID, email, item }) => {
  const idQuery = 'SELECT id FROM customers WHERE email = $1';
  email = email.toLowerCase();
  try {
    //
    let customerID = await db.query(idQuery, [email]);
    if (customerID.rows[0]) {
      customerID = customerID.rows[0].id;
    } else {
      throw new Error('no customers found with given email');
    }

    const query = `
      INSERT INTO orders (
        id, customer_id, order_date, item
      )
      VALUES (
        $1, $2, CURRENT_TIMESTAMP,$3
      )`;
    return db.query(query, [orderID, customerID, item]);
  } catch (error) {
    throw new Error('error adding order', error);
  }
};

exports.getAllCustomers = async (count, offset) => {
  try {
    const query = `
      SELECT
        customers.id, customers.first_name, customers.last_name, customers.dob, EXTRACT (DAY FROM customers.dob) AS day_of_birth, customers.city, customers.email, countries.country, countries.country_code, countries.continent
      FROM customers
      INNER JOIN countries ON customers.country_id = countries.id
      LIMIT $1 OFFSET $2`;
    return db.query(query, [count, offset]);
  } catch (error) {
    throw new Error('Error getting all customers', error);
  }
};

exports.searchForCustomer = async (customerID) => {
  try {
    // param must be either customerID or email, ideally the only
    const query = `
    SELECT
      customers.id, customers.first_name, customers.last_name, customers.dob, EXTRACT (DAY FROM customers.dob) AS day_of_birth, customers.city, customers.email, countries.country, countries.country_code, countries.continent
    FROM customers
    INNER JOIN countries ON customers.country_id = countries.id
    WHERE customers.id = $1`;
    return db.query(query, [customerID]);
  } catch (error) {
    throw new Error('Error finding customer', error);
  }
};

exports.searchForOrder = async (orderID) => {
  try {
    const query = `
    SELECT (
      order.id, order.item, order.order_date, customer.id, customer.first_name, customer.last_name, customer.email
    )
    FROM orders
    INNER JOIN customers ON orders.customer_id = customers.id
    WHERE order.id = $1`;
    return db.query(query, [orderID]);
  } catch (error) {
    throw new Error('Error finding customer', error);
  }
};
