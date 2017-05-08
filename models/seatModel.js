'use strict'

const { bookshelf } = require('../db/database.js')
require('./gigModel.js')
require('./userModel.js')

const Seat = bookshelf.Model.extend(
  {
    tableName: 'seats',
    user: function() { return this.hasOne('User') },
    gig: function() { return this.hasOne('Gig') }
  },
  {
    getOne: function(id) {
      return this.forge({ id })
    },
    getAllByGig: function(id) {
      return this.forge(id).fetch({ withRelated: ['gig'], require: true})
    },
    create: function(newSeat) {
      return this.forge(newSeat).save({},{require: true})
    },
    update: function(id, updates) {
      return this.forge({id}).save({updates})
    },
    delete: function(id) {
      return this.forge({id}).destroy()
    }
  },
  {
    dependents: ['user', 'gig']
  }
)

module.exports = bookshelf.model('Seat', Seat)
