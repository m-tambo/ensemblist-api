'use strict'

const bookshelf = require('../db/database.js')

const Seat = bookshelf.Model.extend(
  {
    tableName: 'seats'
  },
  {

  }
)

module.exports = bookshelf.model('Seat', Seat)
