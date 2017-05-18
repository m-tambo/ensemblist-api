'use strict'

const Gig = require('../models/gigModel.js')
const User = require('../models/userModel.js')
const Seat = require('../models/seatModel.js')

module.exports.getUser = ({ params: { userId } }, res, next) => {
  User.getOne(userId)
    .then(user => res.status(200).json(user))
    .catch(err => next(err))
}

module.exports.getUsersByInst = ({ params: { instrument } }, res, next) => {
  User.getAllByInstrument(instrument)
    .then(user => res.status(200).json(user))
    .catch(err => next(err))
}

module.exports.getUsersByGig = ({ params: { gigId } }, res, next) => {
  User.getAllByGig(gigId)
    .then(users => res.status(200).json(users))
    .catch(err => next(err))
}

module.exports.createUser = ({ body }, res, next) => {
  User.create(body)
    .then(() => res.status(201).json({ "msg": "New user created" }))
    .catch(err => next(err))
}


module.exports.updateUser = (req, res, next) => {
  User.update(req.params.userId, req.body)
    .then(() => res.status(201).json({ "msg": "Updated user info" }))
    .catch(err => next(err))
}

module.exports.deleteUser = ({ params: { userId } }, res, next) => {
  User.delete(userId)
    .then(() => res.status(202).json({'msg': 'User removed'}))
    .catch(err => next(err))
}
