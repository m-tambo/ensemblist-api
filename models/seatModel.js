'use strict'

const bookshelf = require('../db/database.js')
require('./gigModel.js')
require('./userModel.js')

const Seat = bookshelf.Model.extend(
  {
    tableName: 'seats'
    user: function() { return this.hasOne('User') },
    gig: function() { return this.hasOne('Gig') }
  },
  {
    getAllGigs: function() {
      console.log("Get all from the Gig model");
      return this.forge()
        .fetchAll()
        .then(rows => rows)
        .catch(error => error)
    },
    getOneGig: function(id) {
      return this.forge({id})
        .fetch()
        .then(show => show)
        .catch(err => err)
    }

  },
  {
    dependents: ['user', 'gig']
  }
)

module.exports = bookshelf.model('Seat', Seat)
