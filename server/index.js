require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 1337;
const query = require('../db/queries');

app.use('/', (req, res, next) => {
  console.log(`${req.method} at ${req.url}`);
  next();
});

app.use(express.json());

app.post('/registration', async (req, res) => {
  try {
    await query.newCustomer(req.body);
    res.status(201).send('success')
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
app.get('/bday', async (req, res) => {
  try {
    const day = await query.getCustomersDayOfBirth(req.body.customerID);
    res.send(day);
  } catch (error) {
    res.status(400).send(error);
  }
})

app.listen(port, () => {
  console.log(`Kieran's app listening on port ${port}`)
});