'use strict'

const { Router } = require('express')
const router = Router()

const { createSession, destroySession } = require('../controllers/sessionCtrl.js')
const { getGig, getGigsByOwner, createGig, updateGig, deleteGig } = require('../controllers/gigCtrl.js')
const { getSeat, getSeatsByGig, getSeatsByUser, createSeat, updateSeat, deleteSeat } = require('../controllers/seatCtrl.js')
const { getUser, getUsersByInst, getUsersByGig, createUser, updateUser, deleteUser } = require('../controllers/userCtrl.js')
const { getZips, getLatLong } = require('./zipCode.js')

router.post('/login', createSession)
router.post('/logout', destroySession)

// login guard middleware. send user back if not authenticated
// router.use( (req, res, next) => {
//   // console.log("req.user:", req.user)
//   if (req.isAuthenticated()) {
//     next()
//   } else {
//     res.redirect('/login')
//   }
// })
router.get('/gig/:gigId', getGig)
router.get('/gigs/:ownerId', getGigsByOwner)
router.post('/gig/new', createGig)
router.patch('/gig/edit/:gigId', updateGig)
router.delete('/gig/delete/:gigId', deleteGig)

router.get('/seat/:seatId', getSeat)
router.get('/seats/:gigId', getSeatsByGig)
router.get('/seatsuser/:userId', getSeatsByUser)
router.post('/seat/new', createSeat)
router.patch('/seat/edit/:seatId', updateSeat)
router.delete('/seat/delete/:seatId', deleteSeat)

router.get('/user/:userId', getUser)
router.get('/users/all/:instrument', getUsersByInst) // by instrument
router.get('/users/all/:gigId', getUsersByGig) // by gig
router.post('/register', createUser)
router.patch('/user/edit/:userId', updateUser)
router.delete('/user/delete/:userId', deleteUser)

router.get('/zipsearch/:zip/:radius', getZips)
router.get('/latlong/:zip', getLatLong)


module.exports = router
