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

module.exports.createUser = ({body: {email, password, confirmation}}, res, next) => {
  console.log("body obj from the user ctrl:", email, password, confirmation)
  if (password === confirmation) {
    User.findOneByEmail(email)
    .then( (user) => {
      if (user) return res.render('register', { msg: 'Email is already registered'})
      return User.create({email: email, password: password})
      .then( () => res.status(201).json({ "msg": "New user added" }))
      // catch for save()
      .catch( (err) => next(err))
    })
  } else {
    res.send({ msg: 'Oops. Password and confirmation did not match. Try again'})
  }
}

// ({ body }, res, next) => {
//   User.create(body)
//     .then(() => res.status(201).json({ "msg": "New user created" }))
//     .catch(err => next(err))
// }


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
