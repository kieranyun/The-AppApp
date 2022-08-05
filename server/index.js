require('dotenv').config();
const express = require('express');
const cors = require('cors');
const query = require('../db/queries');

const app = express();
const port = process.env.PORT || 1337;

app.use('/', (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`${req.method} at ${req.url}`);
  next();
});

app.use(express.json());
app.use(cors());

app.post('/customers', async (req, res) => {
  try {
    await query.newCustomer(req.body);
    res.status(201).send('success');
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/orders', async (req, res) => {
  try {
    await query.newOrder(req.body);
    res.status(201).send('order posted');
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/customers', async (req, res) => {
  try {
    const { page = 1, count = 5 } = req.query;
    const offset = (Number(page) - 1) * Number(count);
    let customerList = await query.getAllCustomers(count, offset);
    customerList = customerList.rows;
    res.send(customerList);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/customers/:customerID', async (req, res) => {
  try {
    const { customerID } = req.params;
    let customer = await query.searchForCustomer(customerID);
    [customer] = customer.rows;
    if (customer) {
      res.send(customer);
    } else {
      res.status(404).send('no customers found with given id');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Kieran's app listening on port ${port}`);
});
