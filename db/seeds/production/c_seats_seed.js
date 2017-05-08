'use strict';

const { knex } = require('../../database.js');
const seatData = require('../../../mock-data/fake-seats.json')

let seatPromise = seatData.map((seat) => {
  return knex('seats').insert({user_id:seat.user_id, gig_id:seat.gig_id, instrument:seat.instrument, status:seat.status})
})

exports.seed = function(knex, Promise) {
  return knex('seats').del()
  .then(function() {
    return Promise.all(seatPromise)
  })
};
