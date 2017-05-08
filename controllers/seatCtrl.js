'use strict'

const Gig = require('../models/gigModel.js')
const User = require('../models/userModel.js')
const Seat = require('../models/seatModel.js')

module.exports.getSeat = ({ params: { seatId } }, res, next) => {
  Seat.getOneSeat(seatId)
    .catch(err => next(err))
}

module.exports.getSeatsByGig = ({ params: { gigId } }, res, next) => {
  Seat.forge().fetchAll().where({ gig_id: gigId })
    .then(gigs => res.status(200).json(gigs))
    .catch(err => next(err))
}

module.exports.createSeat = ({ body }, res, next) => {
  Seat.forge(body)
    .save()
    .then(() => res.status(201).json({ "msg": "New seat added" }))
    .catch(err => next(err))
}

module.exports.updateSeat = (req, res, next) => {
  Seat.forge(req.body)
    .save()
    .then(() => res.status(201).json({ "msg": "Seat updated" }))
    .catch(err => next(err))
}

module.exports.deleteSeat = ({ params: { seatId } }, res, next) => {
  Type.forge({ seatId })
    .destroy()
    .then(() => res.status(202).json({'msg': 'Seat removed'}))
    .catch(err => next(err))
}
