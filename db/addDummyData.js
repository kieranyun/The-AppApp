/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');

const db = require('./index');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

async function addAMillyOrders() {
  for (let i = 3; i <= 1000000; i += 1) {
    // const randomName = faker.name.findName(); // Rowan Nikolaus
    // const [firstName, lastName] = randomName.split(' ');
    // const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.bi
    const randomCustomer = getRandomInt(1, 1000000);
    const randomItem = `${faker.commerce.productAdjective()} ${faker.commerce.product()}`;
    const query = `
      INSERT INTO Orders (
        id, customer_id, order_date, item
      )
      VALUES (
        $1, $2, CURRENT_TIMESTAMP, $3
      )
      `;
    // eslint-disable-next-line no-await-in-loop
    await db.query(query, [
      i, randomCustomer, randomItem]);
  }
}

addAMillyOrders();
