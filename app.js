const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const routes = require('./routes') // automatically looks for index.js file
const port = process.env.PORT || 3030;

app.use(cors()) // allows cross-origin sharing
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: '*/*' }))

// app.post('/test', (req, res) => res.send(`Hello ${req.body.name}`))
app.use('/api/v1', routes)

app.use((err, req, res, next) => {
  console.log("err:", err)
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: err
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port} in env: ${process.env.NODE_ENV}`);
});

module.exports = app;
