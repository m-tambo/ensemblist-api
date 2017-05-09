'use strict'

const Gig = require('../models/gigModel.js')
const User = require('../models/userModel.js')
const Seat = require('../models/seatModel.js')

module.exports.getGig = ({ params: {gigId} }, res, next) => {
  Gig.getOne(gigId)
    .then(gig => res.status(200).json(gig))
    .catch(err => next(err))
}

module.exports.getGigsByOwner = ({ params: { ownerId } }, res, next) => {
  Gig.getAllByOwner(ownerId)
    .then(gigs => res.status(200).json(gigs))
    .catch(err => next(err))
}

module.exports.createGig = (req, res, next) => {
  console.log("body:", req.body)
  Gig.create(req.body)
    .then(() => res.status(201).json({ "msg": "Nice work, you created a gig" }))
    .catch(err => next(err))
}

module.exports.updateGig = (req, res, next) => {
  Gig.update(req.params.gigId, req.body)
    .then(() => res.status(201).json({ "msg": "Gig info updated" }))
    .catch(err => next(err))
}

module.exports.deleteGig = ({ params: { gigId } }, res, next) => {
  Gig.delete(gigId)
    .then(() => res.status(202).json({ "msg": "Gig removed" }))
    .catch(err => next(err))
}
