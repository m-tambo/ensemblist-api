'use strict'

const bookshelf = require('../db/database.js')

const Gig = bookshelf.Model.extend(
  {
    tableName: 'gigs'
  },
  {

  }
)

module.exports = bookshelf.model('Gig', Gig)
