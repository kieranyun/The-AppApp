/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
const {faker} = require('@faker-js/faker');

const db = require('./index');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

async function addAMillyCustomers() {
  for (let i = 1043001; i <= 1123000; i += 1) {
    const randomName = faker.name.findName(); // Rowan Nikolaus
    const [firstName, lastName] = randomName.split(' ');
    const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.bi
    const randomCountry = getRandomInt(1, 250);
    const randomDOB = faker.date.between('1971-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z');
    const randomCity = faker.address.city();
    const query = `
      INSERT INTO Customers (
        id, first_name, last_name, dob, city, country_id, email
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7
      )
	ON CONFLICT (email) DO NOTHING  `;
    await db.query(query, [i, firstName, lastName, randomDOB, randomCity, randomCountry, randomEmail]);
  }
}

addAMillyCustomers();
