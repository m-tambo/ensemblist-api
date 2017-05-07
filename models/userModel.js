'use strict'

const { bookshelf } = require('../db/database.js')
require('./seatModel.js')
require('./gigModel.js')

const User = bookshelf.Model.extend(
  {
    tableName: 'users',
    seat: function() { return this.belongsToMany('Seat') },
    gig: function() { return this.belongsToMany('Gig') }
  },
  {
    getAllUsers: function() {
      console.log("Get all from the User model");
      return this.forge()
        .fetchAll()
        .then(rows => rows)
        .catch(error => error)
    },
    getOneUser: function(id) {
      return this.forge({id})
        .fetch()
        .then(show => show)
        .catch(err => err)
    }
  },
  {
    dependents: ['seat', 'gig']
  }
)

module.exports = bookshelf.model('User', User)
