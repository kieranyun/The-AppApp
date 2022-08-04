const db = require('./index');

exports.newCustomer = async ({customerID, firstName, lastName, dob, city, country, email}) => {
  email = email.toLowerCase();
  try {
    const countryQuery = `SELECT id FROM countries WHERE country ILIKE $1`;
    const countryData = await db.query(countryQuery, [country.charAt(0).toUpperCase() + country.slice(1)]);
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
}

exports.newOrder = async ({orderID, email, item}) => {
  const idQuery = `SELECT id FROM customers WHERE email = $1`;
  email = email.toLowerCase();
  try {
    let customerID = await db.query(idQuery, [email]);
    if (customerID.rows[0]) {
      customerID = customerID.rows[0].id;
    } else {
      throw new Error('no customers found with given email')
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
}

exports.getCustomersDayOfBirth = async (customerID) => {
  try {
    let day = await db.query(`SELECT EXTRACT (DAY FROM dob) FROM customers WHERE id = $1`, [customerID])
    day = day.rows[0].extract;
    return day;
  } catch (error) {
    throw new Error('error getting day of birth', error)
  }
}