'use strict'

const { bookshelf } = require('../db/database.js')
require('./seatModel.js')
require('./gigModel.js')

const User = bookshelf.Model.extend(
  {
    tableName: 'users',
    seats: function() { return this.hasMany('Seat') },
    gig: function() { return this.hasMany('Gig') }
  },
{
    getOne: function(id) {
      return this.forge({ id }).fetch({ withRelated: ['seats'], require: true})
    },
    getAllByInstrument: function(instrument) {
      return this.where({instrument:instrument}).fetchAll()
    },
    getAllByGig: function(id) {
      return this.forge().fetchAll({ withRelated: ['gig'], require: true })
    },
    create: function(newUser) {
      return this.forge(newUser).save({},{require: true})
    },
    update: function(id, updates) {
      return this.where({id}).save(updates, {method: 'update'})
    },
    delete: function(id) {
      return this.forge({id}).destroy()
    },
    findOneByEmail: function (email) {
      return this.forge({email}).fetch()
        .then( (user) => {
          console.log("user found")
          return user
        })
        .catch( () => {
          console.log("Could not find email among users")
          return (null)
        })
    }
  },
  {
    dependents: ['seat', 'gig']
  }
)

module.exports = bookshelf.model('User', User)
