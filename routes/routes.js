'use strict'

const { Router } = require('express')
const router = Router()

const { getGig, getGigsByOwner, createGig, updateGig, deleteGig } = require('../controllers/gigCtrl.js')
const { getSeat, getSeatsByGig, createSeat, updateSeat, deleteSeat } = require('../controllers/seatCtrl.js')
const { getUser, getUsersByGig, createUser, updateUser, deleteUser } = require('../controllers/userCtrl.js')

router.get('/gig/:id', getGig)
router.get('/gigs/:id', getGigsByOwner)
router.post('/gig/new', createGig)
router.patch('/gig/edit/:id', updateGig)
router.delete('/gig/delete/:id', deleteGig)

router.get('/seat/:id', getSeat)
router.get('/seats/:id', getSeatsByGig)
router.post('/seat/new', createSeat)
router.patch('/seat/edit/:id', updateSeat)
router.delete('/seat/delete/:id', deleteSeat)

router.get('/user/:id', getUser)
router.get('/users/:id', getUsersByGig)
router.post('/user/new', createUser)
router.patch('/user/edit/:id', updateUser)
router.delete('/user/delete/:id', deleteUser)

module.exports = router
