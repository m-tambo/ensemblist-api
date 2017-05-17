'use strict'

const Gig = require('../models/gigModel.js')
const User = require('../models/userModel.js')
const Seat = require('../models/seatModel.js')

module.exports.getSeat = ({ params: { seatId } }, res, next) => {
  Seat.getOne(seatId)
    .then(seat => res.status(200).json(seat))
    .catch(err => next(err))
}

module.exports.getSeatsByGig = ({ params: { gigId } }, res, next) => {
  Seat.getAllByGig(gigId)
    .then(seats => res.status(200).json(seats))
    .catch(err => next(err))
}

module.exports.getSeatsByUser = ({ params: { userId } }, res, next) => {
  Seat.getAllByUser(userId)
    .then(seats => res.status(200).json(seats))
    .catch(err => next(err))
}

module.exports.createSeat = ({ body }, res, next) => {
  Seat.create(body)
    .then(() => res.status(201).json({ "msg": "New seat added" }))
    .catch(err => next(err))
}

module.exports.updateSeat = (req, res, next) => {
  Seat.update(req.params.seatId, req.body)
    .then(() => res.status(201).json({ "msg": "Seat updated" }))
    .catch(err => next(err))
}

module.exports.deleteSeat = ({ params: { seatId } }, res, next) => {
  Seat.delete(seatId)
    .then(() => res.status(202).json({'msg': 'Seat removed'}))
    .catch(err => next(err))
}
