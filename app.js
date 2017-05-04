const express = require('express')
const app = express()
const { json } = require('body-parser')

const routes = require('routes') // automatially looks for index.js file

app.use(json()) // converts any req.body to json, via body-parser

app.use('/api/v1', routes)


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port} in this super keen env: ${process.env.NODE_ENV}`);
});

module.exports = app;
