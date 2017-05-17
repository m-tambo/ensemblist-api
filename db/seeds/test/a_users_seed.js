'use strict'

const { knex } = require('../../database.js')
const userData = require('../../../mock-data/randomUsers.json')

let userPromise = userData.map((user) => {
  return knex('users').insert({
    first:user.name.first,
    last:user.name.last,
    email:user.email,
    password:user.login.password,
    street:user.location.street,
    city:user.location.city,
    state:user.location.state,
    zip:user.location.postcode,
    instrument:user.instrument,
    picUrl:user.picture.large
  })
})

exports.seed = function(knex, Promise) {
  return knex('users').del()
  .then(function() {
    return Promise.all(userPromise)
  })
};
