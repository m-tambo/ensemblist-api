'use strict'

const { bookshelf } = require('../db/database.js')
require('./seatModel.js')
require('./userModel.js')


const Gig = bookshelf.Model.extend(
  {
    tableName: 'gigs',
    seats: function() { return this.hasMany('Seat') },
    user: function() { return this.belongsTo('User') }
  },
  {
    getOne: function(id) {
      return this.forge({ id }).fetch({ withRelated: ['seats'], require: true})
    },
    getAllByOwner: function(id) {
      return this.forge({ owner_id: id }).fetchAll()
    },
    create: function(newGig) {
      return this.forge(newGig).save({},{require: true})
    },
    update: function(id, updates) {
      return this.forge({id}).save({updates})
    },
    delete: function(id) {
      return this.forge({id}).destroy()
    }
  },
  {
    dependents: ['seat', 'user']
  }
)

module.exports = bookshelf.model('Gig', Gig)
