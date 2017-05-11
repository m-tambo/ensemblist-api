'use strict'

const { bookshelf } = require('../db/database.js')
require('./gigModel.js')
require('./userModel.js')

const Seat = bookshelf.Model.extend(
  {
    tableName: 'seats',
    user: function() { return this.belongsTo('User') },
    gig: function() { return this.belongsTo('Gig') }
  },
  {
    getOne: function(id) {
      return this.forge({ id }).fetch()
    },
    getAllByGig: function(id) {
      return this.where({ gig_id: id}).fetchAll({ withRelated: ['user'], require: true})
    },
    create: function(newSeat) {
      return this.forge(newSeat).save({},{require: true})
    },
    update: function(id, updates) {
      return this.where({id}).save(updates, {method: 'update'})
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
