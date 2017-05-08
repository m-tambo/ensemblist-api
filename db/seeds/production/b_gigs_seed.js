'use strict';

const { knex } = require('../../database.js');
const gigData = require('../../../mock-data/fake-gigs.json')

let gigPromise = gigData.map((gig) => {
  return knex('gigs').insert({owner_id:gig.owner_id, name:gig.name, description:gig.description, seatNum:gig.seatNum, date:gig.date, status:gig.status})
})

exports.seed = function(knex, Promise) {
  return knex('gigs').del()
  .then(function() {
    return Promise.all(gigPromise)
  })
};
