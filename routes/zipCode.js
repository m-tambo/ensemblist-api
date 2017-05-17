'use strict'

const rp = require('request-promise')
require('dotenv').config()

const zipAPI = process.env.ZIP_API_KEY

module.exports.getZips = (req, res, next) => { // hit ZIP API for zip codes in a specified radius
  rp({
    uri: `https://www.zipcodeapi.com/rest/${zipAPI}/radius.json/${req.params.zip}/${req.params.radius}/mile`,
    json: true
  })
  .then((data) => { // cut down the object to just an array of zip codes
    let zipArray = []
    for (let i = 0; i < data.zip_codes.length; i++) {
      zipArray.push(Number(data.zip_codes[i].zip_code))
    }
    return zipArray
  })
  .then((array) => res.status(200).json(array))
  .catch(err => next(err))
}

module.exports.getLatLong = (req, res, next) => {
  rp({
    uri: `https://www.zipcodeapi.com/rest/${zipAPI}/info.json/${req.params.zip}/degrees`,
    json: true
  })
  .then((data) => {
    res.status(200).json(data)
  })
  .catch(err => next(err))
}
