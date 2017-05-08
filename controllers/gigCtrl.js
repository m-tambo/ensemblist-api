'use strict'

const Gig = require('../models/gigModel.js')
const User = require('../models/userModel.js')
const Seat = require('../models/seatModel.js')

module.exports.getGig = ({ params: {gigId} }, res, next) => {
  Gig.forge({ gigId })
    .fetch({ withRelated: ['user'], require: true})
    .then(gig => res.status(200).json(gig))
    .catch(err => next(err))
}

module.exports.getGigsByOwner = ({ params: { ownerId } }, res, next) => {
  Gig.forge().fetchAll().where({ owner_id: ownerId })
    .then(gigs => res.status(200).json(gigs))
    .catch(err => next(err))
}

module.exports.createGig = ({ body }, res, next) => {
  Gig.forge(body)
    .save()
    .then(() => res.status(201).json({ "msg": "Nice work, you created a gig" }))
    .catch(err => next(err))
}

module.exports.updateGig = (req, res, next) => {
  Gig.getOneGig(req.params.gigId)
    .forge(req.body)
    .save()
    .then(() => res.status(201).json({ "msg": "Gig info updated" }))
    .catch(err => next(err))
}

module.exports.deleteGig = ({ params: { gigId } }, res, next) => {
  Gig.forge().where({ id: gigId }).destroy()
    .then(() => res.status(202).json({ "msg": "Gig removed" }))
    .catch(err => next(err))
}
