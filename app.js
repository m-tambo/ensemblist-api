const express = require('express')
const app = express()
const { json } = require('body-parser')

const routes = require('./routes') // automatically looks for index.js file

app.use(json()) // converts any req.body to json, via body-parser

app.use('/api/v1', routes)


const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Listening on port ${port} in env: ${process.env.NODE_ENV}`);
});

module.exports = app;
