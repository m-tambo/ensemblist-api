'use strict'

const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile.js')[environment]
const knex = require('knex')(config)
const bookshelf = require('bookshelf')(knex)

// allows us to hash the users' passwords before saving them
bookshelf.plugin(require('bookshelf-bcrypt'))

// registers each model with a string so they can be accesses without circular dependency
bookshelf.plugin('registry')

module.exports = { knex, bookshelf }
