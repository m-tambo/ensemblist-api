'use strict'

const Gig = require('../models/gigModel.js')
const User = require('../models/userModel.js')
const Seat = require('../models/seatModel.js')

module.exports.getUser = ({ params: { userId } }, res, next) => {
  User.forge({ userId })
    .then(user => res.status(200).json(user))
    .catch(err => next(err))
}

module.exports.getUsersByInst = ({ params: { instrument } }, res, next) => {
  User.forge.where({ instrument: instrument })
    .then(user => res.status(200).json(user))
    .catch(err => next(err))
}

module.exports.getUsersByGig = ({ params: { gigId } }, res, next) => {
  User.getAllUsers
    .fetch({ withRelated: ['gig'], require: true })
    .where({owner_id: gigId})
    .then(users => res.status(200).json(users))
    .catch(err => next(err))
}

module.exports.createUser = ({ body }, res, next) => {
  User.forge(body)
    .save()
    .then(() => res.status(201).json({ "msg": "New user created" }))
    .catch(err => next(err))
}

module.exports.updateUser = (req, res, next) => {
  User.forge(req.body)
    .save()
    .then(() => res.status(201).json({ "msg": "Updated user info" }))
    .catch(err => next(err))
}

module.exports.deleteUser = ({ params: { userId } }, res, next) => {
  Type.forge({ userId })
    .destroy()
    .then(() => res.status(202).json({'msg': 'User removed'}))
    .catch(err => next(err))
}
