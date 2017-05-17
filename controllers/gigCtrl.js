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

module.exports.createGig = ({ body }, res, next) => {
  Gig.create(body)
    .then((gig) => res.status(201).json(gig))
    .catch(err => next(err))
}

module.exports.updateGig = (req, res, next) => {
  Gig.update(req.params.gigId, req.body)
    .then(() => res.status(201).json({ "msg": "Gig info updated" }))
    .catch(err => next(err))
}

module.exports.deleteGig = ({ params: { gigId } }, res, next) => {
  Seat.forge()  // first delete all seats with this gig id
    .where({ gig_id: gigId })
    .destroy()
    .then(() => {  // then delete gig
      Gig.delete(gigId)
        .then(() => res.status(202).json({ "msg": "Gig removed" }))
        .catch(err => next(err))
    })
}
