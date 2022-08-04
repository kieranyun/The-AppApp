require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT ||

app.use('/', (req, res, next) => {
  console.log(`${req.method} at ${req.url}`);
  next();
});

app.listen(port, () => {
  console.log(`Kieran's app listening on port ${port}`)
})