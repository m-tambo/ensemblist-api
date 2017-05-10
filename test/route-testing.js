process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../app')
const { knex } = require('../db/database')
chai.use(chaiHttp)


describe('All the API endpoints', () => {
  beforeEach( () => {
    return knex.migrate.rollback()
      .then (() => {
        return knex.migrate.latest()
      })
      .then (() => {
        return knex.seed.run()
      })
  });

// ______API ROOT______
  describe('API Root', () => {
    it('should have all routes',() => {
      return chai.request(server)
        .get('/api/v1/')
        .then((res) => {
          res.should.have.status(200)
          res.should.be.a.json
        })
    })
  });

// ______GIG ENDPOINTS______
// getGig
  describe(`GET /api/v1/gig/:gigId`, function() {
    it(`should return a gig of specified id`, function() {
      return chai.request(server)
        .get(`/api/v1/gig/1`).then(res => {
          res.should.have.status(200)
          res.should.be.json
        })
    })
  })
// getGigsByOwner
  describe(`GET /api/v1/gigs/:ownerId`, function() {
    it(`should return all gigs of specific owner`, function() {
      return chai.request(server)
        .get(`/api/v1/gigs/1`).then(res => {
          res.should.have.status(200)
          res.should.be.json
        })
    })
  })
// createGig
  describe(`POST to /api/v1/gig/new`, function() {
    it(`should add a new gig to the database`, function() {
      return chai.request(server)
        .post(`/api/v1/gig/new`)
        .send({"owner_id":1,"name":"House Party","description":"Band for a house party","seatNum":4,"date":"07/07/2017","status":"open"})
        .then(res => {
          res.should.be.json
          res.should.have.status(201)
        })
    })
  });
// updateGig
  describe('PATCH /api/v1/gig/edit/:gigId', () =>{
    it('should update the gig obj', () => {
      return chai.request(server)
      .patch('/api/v1/gig/edit/1')
      .send({
        "owner_id": 1,
        "name": "Magnuson Wedding",
        "description": "String quartet needed to play Mozart for the Magnuson wedding",
        "seatNum": 5,
        "date": "07/07/2017",
        "status": "open"
      })
      .then( (res) => {
        res.should.have.status(201)
        res.should.be.a.json
        res.should.be.a('object')
        // res.seatNum.should.equal(4)
      })
    })
  });
// deleteGig
  describe(`DELETE /gig/delete/:gigId`, function() {
    it(`should delete the gig of specified id`, function() {
      return chai.request(server)
        .delete(`api/v1/gig/delete/1`)
        .then(res => {
          res.should.have.status(202)
        })
    })
  });

// ______SEAT ENDPOINTS______
// getSeat
 describe(`GET /api/v1/seat/:seatId`, function() {
    it(`should return a seat of a certain id`, function() {
      return chai.request(server)
        .get(`/api/v1/seat/1`).then(res => {
          res.should.have.status(200)
          res.should.be.json
        })
    })
  })
// getSeatsByGig
 describe(`GET /api/v1/seats/:gigId`, function() {
    it(`should return all seats of a certain gig`, function() {
      return chai.request(server)
        .get(`/api/v1/seats/1`).then(res => {
          res.should.have.status(200)
          res.should.be.json
        })
    })
  })
// createSeat
  describe(`POST to /api/v1/seat/new`, function() {
    it(`should add a new seat to the database`, function() {
      return chai.request(server)
        .post(`/api/v1/seat/new`)
        .send({"user_id": 1,"gig_id": 1, "instrument": "violin", "status": "accepted"})
        .then(res => {
          res.should.be.json
          res.should.have.status(201)
        })
    })
  });
// updateSeat
  describe('PATCH /api/v1/seat/edit/:seatId', () =>{
    it('should update a seat', () => {
      return chai.request(server)
      .patch('/api/v1/seat/edit/1')
      .send({"user_id": 1,"gig_id": 1, "instrument": "banjo", "status": "accepted"})
      .then( (res) => {
        res.should.have.status(201)
        res.should.be.a.json
        res.should.be.a('object')
        // res.instrument.should.equal('banjo')
      })
    })
  });
// deleteSeat
  describe(`DELETE /seat/delete/:seatId`, function() {
    it(`should delete the seat of specified id`, function() {
      return chai.request(server)
        .delete(`api/v1/seat/delete/1`)
        .then(res => {
          res.should.have.status(202)
        })
    })
  });

// ______USER ENDPOINTS______
// getUser
describe(`GET /api/v1/user/:userId`, function() {
    it(`should return a user of a certain id`, function() {
      return chai.request(server)
        .get(`/api/v1/user/1`).then(res => {
          res.should.have.status(200)
          res.should.be.json
        })
    })
  })
// getUsersByInst
 describe(`GET /api/v1/users/all/:instrument`, function() {
    it(`should return all users who play a certain instrument`, function() {
      return chai.request(server)
        .get(`/api/v1/users/all/saxophone`).then(res => {
          res.should.have.status(200)
          res.should.be.json
        })
    })
  })
// getUsersByGig
 describe(`GET /api/v1/users/all/:gigId`, function() {
    it(`should return all users of a certain gig`, function() {
      return chai.request(server)
        .get(`/api/v1/users/all/1`).then(res => {
          res.should.have.status(200)
          res.should.be.json
        })
    })
  })
// createUser
  describe(`POST to /api/v1/user/new`, function() {
    it(`should add a new user to the database`, function() {
      return chai.request(server)
        .post(`/api/v1/user/new`)
        .send({
          "name": {
            "title": "ms",
            "first": "edna",
            "last": "mckinney"
          },
          "location": {
            "street": "2019 mockingbird ln",
            "city": "broken arrow",
            "state": "pennsylvania",
            "postcode": 42211
          },
          "email": "edna.mckinney@example.com",
          "picture": {
            "large": "https://randomuser.me/api/portraits/women/83.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/83.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/83.jpg"
          },
          "instrument": "voice alto"
        })
        .then(res => {
          // res.should.be.json
          res.should.have.status(201)
        })
    })
  });
// updateUser
  describe('PATCH /api/v1/user/edit/:userId', () =>{
    it('should update a user of specified id', () => {
      return chai.request(server)
      .patch('/api/v1/user/edit/1')
      .send({
        "name": {
          "title": "mr",
          "first": "philip",
          "last": "riley"
        },
        "location": {
          "street": "4200 depaul dr",
          "city": "red oak",
          "state": "new jersey",
          "postcode": 35652
        },
        "email": "philip.riley@example.com",
        "picture": {
          "large": "https://randomuser.me/api/portraits/men/71.jpg",
          "medium": "https://randomuser.me/api/portraits/med/men/71.jpg",
          "thumbnail": "https://randomuser.me/api/portraits/thumb/men/71.jpg"
        },
        "instrument": "tuba"
      })
      .then( (res) => {
        res.should.have.status(201)
        res.should.be.a.json
        res.should.be.a('object')
        // res.instrument.should.equal('tuba')
      })
    })
  });
// deleteUser
  describe(`DELETE /user/delete/:userId`, function() {
    it(`should delete the user of specified id`, function() {
      return chai.request(server)
        .delete(`api/v1/user/delete/1`)
        .then(res => {
          res.should.have.status(202)
        })
    })
  });

})
