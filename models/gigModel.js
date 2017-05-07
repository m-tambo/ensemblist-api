'use strict'

const { bookshelf } = require('../db/database.js')
require('./seatModel.js')
require('./userModel.js')


const Gig = bookshelf.Model.extend(
  {
    tableName: 'gigs',
    seat: function() { return this.belongsToMany('Seat') },
    user: function() { return this.hasOne('User') }
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
    dependents: ['seat', 'user']
  }
)

module.exports = bookshelf.model('Gig', Gig)
