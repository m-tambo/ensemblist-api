const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const routes = require('./routes') // automatically looks for index.js file

const port = process.env.PORT || 3030;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1', routes)

app.listen(port, () => {
  console.log(`Listening on port ${port} in env: ${process.env.NODE_ENV}`);
});

module.exports = app;
