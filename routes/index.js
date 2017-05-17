'use strict'

const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.json({
    "title": "Ensemblist API"
  }) //end of json
})

router.use(require('./routes.js'))

module.exports = router
