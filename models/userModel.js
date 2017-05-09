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
    getOne: function(id) {
      return this.forge({ id })
    },
    getAllByInstrument: function(instrument) {
      return this.forge().fetchAll().where({instrument:instrument})
    },
    getAllByGig: function(id) {
      return this.forge().fetchAll({ withRelated: ['gig'], require: true })
    },
    create: function(newUser) {
      return this.forge(newUser).save({},{require: true})
    },
    update: function(id, updates) {
      return this.forge({id}).save({updates})
    },
    delete: function(id) {
      return this.forge({id}).destroy()
    }
  },
  {
    dependents: ['seat', 'gig']
  }
)

module.exports = bookshelf.model('User', User)
